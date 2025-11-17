/**
 * @summary
 * Retrieves a paginated and filtered list of vehicles from the catalog with
 * comprehensive filtering options including brand, fuel type, transmission, color,
 * year range, price range, and sorting capabilities.
 *
 * @procedure spVehicleList
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/external/vehicle
 *
 * @parameters
 * @param {INT} idBrand
 *   - Required: No
 *   - Description: Filter by brand identifier
 *
 * @param {INT} idFuelType
 *   - Required: No
 *   - Description: Filter by fuel type identifier
 *
 * @param {INT} idTransmission
 *   - Required: No
 *   - Description: Filter by transmission type identifier
 *
 * @param {INT} idColor
 *   - Required: No
 *   - Description: Filter by color identifier
 *
 * @param {INT} yearMin
 *   - Required: No
 *   - Description: Minimum year filter
 *
 * @param {INT} yearMax
 *   - Required: No
 *   - Description: Maximum year filter
 *
 * @param {NUMERIC} priceMin
 *   - Required: No
 *   - Description: Minimum price filter
 *
 * @param {NUMERIC} priceMax
 *   - Required: No
 *   - Description: Maximum price filter
 *
 * @param {BIT} featuredOnly
 *   - Required: No
 *   - Description: Filter featured vehicles only
 *
 * @param {NVARCHAR} sortBy
 *   - Required: No
 *   - Description: Sort field (price, year, model, dateCreated)
 *
 * @param {NVARCHAR} sortOrder
 *   - Required: No
 *   - Description: Sort direction (ASC, DESC)
 *
 * @param {INT} page
 *   - Required: No
 *   - Description: Page number for pagination (default: 1)
 *
 * @param {INT} pageSize
 *   - Required: No
 *   - Description: Items per page (default: 20, max: 100)
 *
 * @testScenarios
 * - List all available vehicles with default pagination
 * - Filter vehicles by brand
 * - Filter vehicles by multiple criteria (brand, year range, price range)
 * - Sort vehicles by price ascending/descending
 * - Sort vehicles by year
 * - Filter featured vehicles only
 * - Pagination with different page sizes
 * - Edge cases: invalid page numbers, out of range filters
 */
CREATE OR ALTER PROCEDURE [functional].[spVehicleList]
  @idBrand INTEGER = NULL,
  @idFuelType INTEGER = NULL,
  @idTransmission INTEGER = NULL,
  @idColor INTEGER = NULL,
  @yearMin INTEGER = NULL,
  @yearMax INTEGER = NULL,
  @priceMin NUMERIC(18, 6) = NULL,
  @priceMax NUMERIC(18, 6) = NULL,
  @featuredOnly BIT = 0,
  @sortBy NVARCHAR(50) = 'dateCreated',
  @sortOrder NVARCHAR(4) = 'DESC',
  @page INTEGER = 1,
  @pageSize INTEGER = 20
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Validate pagination parameters
   * @throw {invalidPageNumber}
   */
  IF (@page < 1)
  BEGIN
    ;THROW 51000, 'invalidPageNumber', 1;
  END;

  /**
   * @validation Validate page size limits
   * @throw {invalidPageSize}
   */
  IF (@pageSize < 1 OR @pageSize > 100)
  BEGIN
    ;THROW 51000, 'invalidPageSize', 1;
  END;

  /**
   * @validation Validate sort order
   * @throw {invalidSortOrder}
   */
  IF (@sortOrder NOT IN ('ASC', 'DESC'))
  BEGIN
    ;THROW 51000, 'invalidSortOrder', 1;
  END;

  /**
   * @validation Validate sort field
   * @throw {invalidSortField}
   */
  IF (@sortBy NOT IN ('price', 'year', 'model', 'dateCreated', 'mileage'))
  BEGIN
    ;THROW 51000, 'invalidSortField', 1;
  END;

  DECLARE @offset INTEGER = (@page - 1) * @pageSize;

  /**
   * @rule {db-vehicle-list-filtering} Apply comprehensive filtering and sorting
   */
  WITH [FilteredVehicles] AS (
    SELECT
      [vhc].[idVehicle],
      [vhc].[model],
      [vhc].[year],
      [vhc].[price],
      [vhc].[mileage],
      [vhc].[description],
      [vhc].[engineSize],
      [vhc].[doors],
      [vhc].[featured],
      [brn].[idBrand],
      [brn].[name] AS [brandName],
      [fuelTyp].[idFuelType],
      [fuelTyp].[name] AS [fuelTypeName],
      [trn].[idTransmission],
      [trn].[name] AS [transmissionName],
      [clr].[idColor],
      [clr].[name] AS [colorName],
      [clr].[hexCode] AS [colorHex],
      (
        SELECT TOP 1 [vhcImg].[imageUrl]
        FROM [functional].[vehicleImage] [vhcImg]
        WHERE [vhcImg].[idVehicle] = [vhc].[idVehicle]
          AND [vhcImg].[isPrimary] = 1
      ) AS [primaryImageUrl],
      CASE @sortBy
        WHEN 'price' THEN [vhc].[price]
        WHEN 'year' THEN [vhc].[year]
        WHEN 'mileage' THEN [vhc].[mileage]
        ELSE NULL
      END AS [numericSortValue],
      CASE @sortBy
        WHEN 'model' THEN [vhc].[model]
        ELSE NULL
      END AS [stringSortValue],
      CASE @sortBy
        WHEN 'dateCreated' THEN [vhc].[dateCreated]
        ELSE NULL
      END AS [dateSortValue]
    FROM [functional].[vehicle] [vhc]
      JOIN [config].[brand] [brn] ON ([brn].[idBrand] = [vhc].[idBrand])
      JOIN [config].[fuelType] [fuelTyp] ON ([fuelTyp].[idFuelType] = [vhc].[idFuelType])
      JOIN [config].[transmission] [trn] ON ([trn].[idTransmission] = [vhc].[idTransmission])
      JOIN [config].[color] [clr] ON ([clr].[idColor] = [vhc].[idColor])
    WHERE [vhc].[deleted] = 0
      AND [vhc].[available] = 1
      AND ((@idBrand IS NULL) OR ([vhc].[idBrand] = @idBrand))
      AND ((@idFuelType IS NULL) OR ([vhc].[idFuelType] = @idFuelType))
      AND ((@idTransmission IS NULL) OR ([vhc].[idTransmission] = @idTransmission))
      AND ((@idColor IS NULL) OR ([vhc].[idColor] = @idColor))
      AND ((@yearMin IS NULL) OR ([vhc].[year] >= @yearMin))
      AND ((@yearMax IS NULL) OR ([vhc].[year] <= @yearMax))
      AND ((@priceMin IS NULL) OR ([vhc].[price] >= @priceMin))
      AND ((@priceMax IS NULL) OR ([vhc].[price] <= @priceMax))
      AND ((@featuredOnly = 0) OR ([vhc].[featured] = 1))
  )
  /**
   * @output {VehicleList, n, n}
   * @column {INT} idVehicle - Vehicle identifier
   * @column {NVARCHAR} model - Vehicle model name
   * @column {INT} year - Manufacturing year
   * @column {NUMERIC} price - Vehicle price
   * @column {INT} mileage - Vehicle mileage in kilometers
   * @column {NVARCHAR} description - Vehicle description
   * @column {NUMERIC} engineSize - Engine size in liters
   * @column {INT} doors - Number of doors
   * @column {BIT} featured - Featured vehicle flag
   * @column {INT} idBrand - Brand identifier
   * @column {NVARCHAR} brandName - Brand name
   * @column {INT} idFuelType - Fuel type identifier
   * @column {NVARCHAR} fuelTypeName - Fuel type name
   * @column {INT} idTransmission - Transmission identifier
   * @column {NVARCHAR} transmissionName - Transmission name
   * @column {INT} idColor - Color identifier
   * @column {NVARCHAR} colorName - Color name
   * @column {VARCHAR} colorHex - Color hex code
   * @column {NVARCHAR} primaryImageUrl - Primary image URL
   */
  SELECT
    [fltVhc].[idVehicle],
    [fltVhc].[model],
    [fltVhc].[year],
    [fltVhc].[price],
    [fltVhc].[mileage],
    [fltVhc].[description],
    [fltVhc].[engineSize],
    [fltVhc].[doors],
    [fltVhc].[featured],
    [fltVhc].[idBrand],
    [fltVhc].[brandName],
    [fltVhc].[idFuelType],
    [fltVhc].[fuelTypeName],
    [fltVhc].[idTransmission],
    [fltVhc].[transmissionName],
    [fltVhc].[idColor],
    [fltVhc].[colorName],
    [fltVhc].[colorHex],
    [fltVhc].[primaryImageUrl]
  FROM [FilteredVehicles] [fltVhc]
  ORDER BY
    CASE WHEN (@sortOrder = 'ASC') THEN [fltVhc].[numericSortValue] END ASC,
    CASE WHEN (@sortOrder = 'DESC') THEN [fltVhc].[numericSortValue] END DESC,
    CASE WHEN (@sortOrder = 'ASC') THEN [fltVhc].[stringSortValue] END ASC,
    CASE WHEN (@sortOrder = 'DESC') THEN [fltVhc].[stringSortValue] END DESC,
    CASE WHEN (@sortOrder = 'ASC') THEN [fltVhc].[dateSortValue] END ASC,
    CASE WHEN (@sortOrder = 'DESC') THEN [fltVhc].[dateSortValue] END DESC
  OFFSET @offset ROWS
  FETCH NEXT @pageSize ROWS ONLY;

  /**
   * @output {TotalCount, 1, 1}
   * @column {INT} total - Total number of vehicles matching filters
   */
  SELECT COUNT(*) AS [total]
  FROM [functional].[vehicle] [vhc]
  WHERE [vhc].[deleted] = 0
    AND [vhc].[available] = 1
    AND ((@idBrand IS NULL) OR ([vhc].[idBrand] = @idBrand))
    AND ((@idFuelType IS NULL) OR ([vhc].[idFuelType] = @idFuelType))
    AND ((@idTransmission IS NULL) OR ([vhc].[idTransmission] = @idTransmission))
    AND ((@idColor IS NULL) OR ([vhc].[idColor] = @idColor))
    AND ((@yearMin IS NULL) OR ([vhc].[year] >= @yearMin))
    AND ((@yearMax IS NULL) OR ([vhc].[year] <= @yearMax))
    AND ((@priceMin IS NULL) OR ([vhc].[price] >= @priceMin))
    AND ((@priceMax IS NULL) OR ([vhc].[price] <= @priceMax))
    AND ((@featuredOnly = 0) OR ([vhc].[featured] = 1));
END;
GO