/**
 * @summary
 * Retrieves detailed information about a specific vehicle including all
 * specifications, images, and related reference data.
 *
 * @procedure spVehicleGet
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/external/vehicle/:id
 *
 * @parameters
 * @param {INT} idVehicle
 *   - Required: Yes
 *   - Description: Vehicle identifier
 *
 * @testScenarios
 * - Retrieve existing vehicle with all details
 * - Attempt to retrieve non-existent vehicle
 * - Attempt to retrieve deleted vehicle
 * - Attempt to retrieve unavailable vehicle
 */
CREATE OR ALTER PROCEDURE [functional].[spVehicleGet]
  @idVehicle INTEGER
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Validate required parameter
   * @throw {vehicleIdRequired}
   */
  IF (@idVehicle IS NULL)
  BEGIN
    ;THROW 51000, 'vehicleIdRequired', 1;
  END;

  /**
   * @validation Verify vehicle exists and is available
   * @throw {vehicleNotFound}
   */
  IF NOT EXISTS (
    SELECT *
    FROM [functional].[vehicle] [vhc]
    WHERE [vhc].[idVehicle] = @idVehicle
      AND [vhc].[deleted] = 0
      AND [vhc].[available] = 1
  )
  BEGIN
    ;THROW 51000, 'vehicleNotFound', 1;
  END;

  /**
   * @rule {db-vehicle-detail-retrieval} Retrieve complete vehicle information
   * @output {VehicleDetail, 1, n}
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
   * @column {VARCHAR} brandCode - Brand code
   * @column {INT} idFuelType - Fuel type identifier
   * @column {NVARCHAR} fuelTypeName - Fuel type name
   * @column {VARCHAR} fuelTypeCode - Fuel type code
   * @column {INT} idTransmission - Transmission identifier
   * @column {NVARCHAR} transmissionName - Transmission name
   * @column {VARCHAR} transmissionCode - Transmission code
   * @column {INT} idColor - Color identifier
   * @column {NVARCHAR} colorName - Color name
   * @column {VARCHAR} colorCode - Color code
   * @column {VARCHAR} colorHex - Color hex code
   * @column {DATETIME2} dateCreated - Creation timestamp
   * @column {DATETIME2} dateModified - Last modification timestamp
   */
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
    [brn].[code] AS [brandCode],
    [fuelTyp].[idFuelType],
    [fuelTyp].[name] AS [fuelTypeName],
    [fuelTyp].[code] AS [fuelTypeCode],
    [trn].[idTransmission],
    [trn].[name] AS [transmissionName],
    [trn].[code] AS [transmissionCode],
    [clr].[idColor],
    [clr].[name] AS [colorName],
    [clr].[code] AS [colorCode],
    [clr].[hexCode] AS [colorHex],
    [vhc].[dateCreated],
    [vhc].[dateModified]
  FROM [functional].[vehicle] [vhc]
    JOIN [config].[brand] [brn] ON ([brn].[idBrand] = [vhc].[idBrand])
    JOIN [config].[fuelType] [fuelTyp] ON ([fuelTyp].[idFuelType] = [vhc].[idFuelType])
    JOIN [config].[transmission] [trn] ON ([trn].[idTransmission] = [vhc].[idTransmission])
    JOIN [config].[color] [clr] ON ([clr].[idColor] = [vhc].[idColor])
  WHERE [vhc].[idVehicle] = @idVehicle
    AND [vhc].[deleted] = 0
    AND [vhc].[available] = 1;

  /**
   * @rule {db-vehicle-images-retrieval} Retrieve all vehicle images ordered by display order
   * @output {VehicleImages, n, n}
   * @column {INT} idVehicleImage - Vehicle image identifier
   * @column {INT} idVehicle - Vehicle identifier
   * @column {NVARCHAR} imageUrl - Image URL
   * @column {BIT} isPrimary - Primary image flag
   * @column {INT} displayOrder - Display order
   * @column {DATETIME2} dateCreated - Creation timestamp
   */
  SELECT
    [vhcImg].[idVehicleImage],
    [vhcImg].[idVehicle],
    [vhcImg].[imageUrl],
    [vhcImg].[isPrimary],
    [vhcImg].[displayOrder],
    [vhcImg].[dateCreated]
  FROM [functional].[vehicleImage] [vhcImg]
  WHERE [vhcImg].[idVehicle] = @idVehicle
  ORDER BY
    [vhcImg].[displayOrder],
    [vhcImg].[idVehicleImage];
END;
GO