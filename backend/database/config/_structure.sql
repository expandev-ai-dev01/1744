/**
 * @schema config
 * Configuration schema - system-wide settings and reference data
 */
CREATE SCHEMA [config];
GO

/**
 * @table brand Vehicle brand reference data
 * @multitenancy false
 * @softDelete false
 * @alias brn
 */
CREATE TABLE [config].[brand] (
  [idBrand] INTEGER IDENTITY(1, 1) NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [code] VARCHAR(50) NOT NULL,
  [active] BIT NOT NULL DEFAULT (1)
);

/**
 * @primaryKey pkBrand
 * @keyType Object
 */
ALTER TABLE [config].[brand]
ADD CONSTRAINT [pkBrand] PRIMARY KEY CLUSTERED ([idBrand]);

/**
 * @index uqBrand_Code Unique brand code constraint
 * @type Search
 * @unique true
 */
CREATE UNIQUE NONCLUSTERED INDEX [uqBrand_Code]
ON [config].[brand]([code])
WHERE [active] = 1;

/**
 * @index ixBrand_Name Brand name search optimization
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixBrand_Name]
ON [config].[brand]([name])
INCLUDE ([code], [active])
WHERE [active] = 1;
GO

/**
 * @table fuelType Vehicle fuel type reference data
 * @multitenancy false
 * @softDelete false
 * @alias fuelTyp
 */
CREATE TABLE [config].[fuelType] (
  [idFuelType] INTEGER IDENTITY(1, 1) NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [code] VARCHAR(50) NOT NULL,
  [active] BIT NOT NULL DEFAULT (1)
);

/**
 * @primaryKey pkFuelType
 * @keyType Object
 */
ALTER TABLE [config].[fuelType]
ADD CONSTRAINT [pkFuelType] PRIMARY KEY CLUSTERED ([idFuelType]);

/**
 * @index uqFuelType_Code Unique fuel type code constraint
 * @type Search
 * @unique true
 */
CREATE UNIQUE NONCLUSTERED INDEX [uqFuelType_Code]
ON [config].[fuelType]([code])
WHERE [active] = 1;
GO

/**
 * @table transmission Vehicle transmission type reference data
 * @multitenancy false
 * @softDelete false
 * @alias trn
 */
CREATE TABLE [config].[transmission] (
  [idTransmission] INTEGER IDENTITY(1, 1) NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [code] VARCHAR(50) NOT NULL,
  [active] BIT NOT NULL DEFAULT (1)
);

/**
 * @primaryKey pkTransmission
 * @keyType Object
 */
ALTER TABLE [config].[transmission]
ADD CONSTRAINT [pkTransmission] PRIMARY KEY CLUSTERED ([idTransmission]);

/**
 * @index uqTransmission_Code Unique transmission code constraint
 * @type Search
 * @unique true
 */
CREATE UNIQUE NONCLUSTERED INDEX [uqTransmission_Code]
ON [config].[transmission]([code])
WHERE [active] = 1;
GO

/**
 * @table color Vehicle color reference data
 * @multitenancy false
 * @softDelete false
 * @alias clr
 */
CREATE TABLE [config].[color] (
  [idColor] INTEGER IDENTITY(1, 1) NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [code] VARCHAR(50) NOT NULL,
  [hexCode] VARCHAR(7) NULL,
  [active] BIT NOT NULL DEFAULT (1)
);

/**
 * @primaryKey pkColor
 * @keyType Object
 */
ALTER TABLE [config].[color]
ADD CONSTRAINT [pkColor] PRIMARY KEY CLUSTERED ([idColor]);

/**
 * @index uqColor_Code Unique color code constraint
 * @type Search
 * @unique true
 */
CREATE UNIQUE NONCLUSTERED INDEX [uqColor_Code]
ON [config].[color]([code])
WHERE [active] = 1;
GO