/**
 * @schema functional
 * Functional schema - business logic and operational data
 */
CREATE SCHEMA [functional];
GO

/**
 * @table vehicle Vehicle catalog master data
 * @multitenancy false
 * @softDelete true
 * @alias vhc
 */
CREATE TABLE [functional].[vehicle] (
  [idVehicle] INTEGER IDENTITY(1, 1) NOT NULL,
  [idBrand] INTEGER NOT NULL,
  [idFuelType] INTEGER NOT NULL,
  [idTransmission] INTEGER NOT NULL,
  [idColor] INTEGER NOT NULL,
  [model] NVARCHAR(200) NOT NULL,
  [year] INTEGER NOT NULL,
  [price] NUMERIC(18, 6) NOT NULL,
  [mileage] INTEGER NOT NULL DEFAULT (0),
  [description] NVARCHAR(500) NOT NULL DEFAULT (''),
  [engineSize] NUMERIC(5, 2) NULL,
  [doors] INTEGER NULL,
  [featured] BIT NOT NULL DEFAULT (0),
  [available] BIT NOT NULL DEFAULT (1),
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [deleted] BIT NOT NULL DEFAULT (0)
);

/**
 * @primaryKey pkVehicle
 * @keyType Object
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [pkVehicle] PRIMARY KEY CLUSTERED ([idVehicle]);

/**
 * @foreignKey fkVehicle_Brand Vehicle brand reference
 * @target config.brand
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [fkVehicle_Brand] FOREIGN KEY ([idBrand])
REFERENCES [config].[brand]([idBrand]);

/**
 * @foreignKey fkVehicle_FuelType Vehicle fuel type reference
 * @target config.fuelType
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [fkVehicle_FuelType] FOREIGN KEY ([idFuelType])
REFERENCES [config].[fuelType]([idFuelType]);

/**
 * @foreignKey fkVehicle_Transmission Vehicle transmission reference
 * @target config.transmission
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [fkVehicle_Transmission] FOREIGN KEY ([idTransmission])
REFERENCES [config].[transmission]([idTransmission]);

/**
 * @foreignKey fkVehicle_Color Vehicle color reference
 * @target config.color
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [fkVehicle_Color] FOREIGN KEY ([idColor])
REFERENCES [config].[color]([idColor]);

/**
 * @check chkVehicle_Year Valid vehicle year range
 * @enum {1900} Minimum year
 * @enum {2100} Maximum year
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [chkVehicle_Year] CHECK ([year] BETWEEN 1900 AND 2100);

/**
 * @check chkVehicle_Price Valid price range
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [chkVehicle_Price] CHECK ([price] >= 0);

/**
 * @check chkVehicle_Mileage Valid mileage range
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [chkVehicle_Mileage] CHECK ([mileage] >= 0);

/**
 * @check chkVehicle_Doors Valid door count
 * @enum {2} Two doors
 * @enum {3} Three doors
 * @enum {4} Four doors
 * @enum {5} Five doors
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [chkVehicle_Doors] CHECK ([doors] IS NULL OR [doors] BETWEEN 2 AND 5);

/**
 * @index ixVehicle_Brand Brand filtering optimization
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixVehicle_Brand]
ON [functional].[vehicle]([idBrand])
INCLUDE ([model], [year], [price])
WHERE [deleted] = 0;

/**
 * @index ixVehicle_FuelType Fuel type filtering optimization
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixVehicle_FuelType]
ON [functional].[vehicle]([idFuelType])
WHERE [deleted] = 0;

/**
 * @index ixVehicle_Transmission Transmission filtering optimization
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixVehicle_Transmission]
ON [functional].[vehicle]([idTransmission])
WHERE [deleted] = 0;

/**
 * @index ixVehicle_Color Color filtering optimization
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixVehicle_Color]
ON [functional].[vehicle]([idColor])
WHERE [deleted] = 0;

/**
 * @index ixVehicle_Year Year filtering and sorting optimization
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixVehicle_Year]
ON [functional].[vehicle]([year] DESC)
INCLUDE ([model], [price])
WHERE [deleted] = 0;

/**
 * @index ixVehicle_Price Price filtering and sorting optimization
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixVehicle_Price]
ON [functional].[vehicle]([price])
INCLUDE ([model], [year])
WHERE [deleted] = 0;

/**
 * @index ixVehicle_Featured Featured vehicles optimization
 * @type Performance
 * @filter Featured and available vehicles only
 */
CREATE NONCLUSTERED INDEX [ixVehicle_Featured]
ON [functional].[vehicle]([featured], [dateCreated] DESC)
INCLUDE ([model], [year], [price])
WHERE [deleted] = 0 AND [featured] = 1 AND [available] = 1;

/**
 * @index ixVehicle_Available Available vehicles optimization
 * @type Performance
 * @filter Available vehicles only
 */
CREATE NONCLUSTERED INDEX [ixVehicle_Available]
ON [functional].[vehicle]([available])
WHERE [deleted] = 0 AND [available] = 1;
GO

/**
 * @table vehicleImage Vehicle image storage
 * @multitenancy false
 * @softDelete false
 * @alias vhcImg
 */
CREATE TABLE [functional].[vehicleImage] (
  [idVehicleImage] INTEGER IDENTITY(1, 1) NOT NULL,
  [idVehicle] INTEGER NOT NULL,
  [imageUrl] NVARCHAR(500) NOT NULL,
  [isPrimary] BIT NOT NULL DEFAULT (0),
  [displayOrder] INTEGER NOT NULL DEFAULT (0),
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE())
);

/**
 * @primaryKey pkVehicleImage
 * @keyType Object
 */
ALTER TABLE [functional].[vehicleImage]
ADD CONSTRAINT [pkVehicleImage] PRIMARY KEY CLUSTERED ([idVehicleImage]);

/**
 * @foreignKey fkVehicleImage_Vehicle Vehicle reference
 * @target functional.vehicle
 */
ALTER TABLE [functional].[vehicleImage]
ADD CONSTRAINT [fkVehicleImage_Vehicle] FOREIGN KEY ([idVehicle])
REFERENCES [functional].[vehicle]([idVehicle]);

/**
 * @index ixVehicleImage_Vehicle Vehicle image lookup optimization
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixVehicleImage_Vehicle]
ON [functional].[vehicleImage]([idVehicle], [displayOrder])
INCLUDE ([imageUrl], [isPrimary]);

/**
 * @index ixVehicleImage_Primary Primary image lookup optimization
 * @type Performance
 * @filter Primary images only
 */
CREATE NONCLUSTERED INDEX [ixVehicleImage_Primary]
ON [functional].[vehicleImage]([idVehicle])
INCLUDE ([imageUrl])
WHERE [isPrimary] = 1;
GO

/**
 * @table contactForm Contact form submissions
 * @multitenancy false
 * @softDelete false
 * @alias cntFrm
 */
CREATE TABLE [functional].[contactForm] (
  [idContactForm] INTEGER IDENTITY(1, 1) NOT NULL,
  [idVehicle] INTEGER NOT NULL,
  [name] NVARCHAR(200) NOT NULL,
  [email] NVARCHAR(200) NOT NULL,
  [phone] NVARCHAR(50) NOT NULL,
  [message] NVARCHAR(1000) NOT NULL,
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [processed] BIT NOT NULL DEFAULT (0),
  [dateProcessed] DATETIME2 NULL
);

/**
 * @primaryKey pkContactForm
 * @keyType Object
 */
ALTER TABLE [functional].[contactForm]
ADD CONSTRAINT [pkContactForm] PRIMARY KEY CLUSTERED ([idContactForm]);

/**
 * @foreignKey fkContactForm_Vehicle Vehicle reference
 * @target functional.vehicle
 */
ALTER TABLE [functional].[contactForm]
ADD CONSTRAINT [fkContactForm_Vehicle] FOREIGN KEY ([idVehicle])
REFERENCES [functional].[vehicle]([idVehicle]);

/**
 * @index ixContactForm_Vehicle Vehicle contact lookup optimization
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixContactForm_Vehicle]
ON [functional].[contactForm]([idVehicle], [dateCreated] DESC)
INCLUDE ([name], [email], [phone]);

/**
 * @index ixContactForm_Processed Unprocessed contacts optimization
 * @type Performance
 * @filter Unprocessed contacts only
 */
CREATE NONCLUSTERED INDEX [ixContactForm_Processed]
ON [functional].[contactForm]([processed], [dateCreated] DESC)
WHERE [processed] = 0;

/**
 * @index ixContactForm_DateCreated Contact date sorting optimization
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixContactForm_DateCreated]
ON [functional].[contactForm]([dateCreated] DESC)
INCLUDE ([idVehicle], [name], [email]);
GO