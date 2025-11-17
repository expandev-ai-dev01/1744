/**
 * @summary
 * Creates a new contact form submission for a specific vehicle with customer
 * information and inquiry message.
 *
 * @procedure spContactFormCreate
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - POST /api/v1/external/contact-form
 *
 * @parameters
 * @param {INT} idVehicle
 *   - Required: Yes
 *   - Description: Vehicle identifier
 *
 * @param {NVARCHAR} name
 *   - Required: Yes
 *   - Description: Customer name (max 200 characters)
 *
 * @param {NVARCHAR} email
 *   - Required: Yes
 *   - Description: Customer email address (max 200 characters)
 *
 * @param {NVARCHAR} phone
 *   - Required: Yes
 *   - Description: Customer phone number (max 50 characters)
 *
 * @param {NVARCHAR} message
 *   - Required: Yes
 *   - Description: Customer inquiry message (max 1000 characters)
 *
 * @returns {INT} idContactForm - Created contact form identifier
 *
 * @testScenarios
 * - Create contact form with all valid parameters
 * - Attempt to create with non-existent vehicle
 * - Attempt to create with deleted/unavailable vehicle
 * - Attempt to create with missing required parameters
 * - Attempt to create with invalid email format
 * - Attempt to create with message exceeding max length
 */
CREATE OR ALTER PROCEDURE [functional].[spContactFormCreate]
  @idVehicle INTEGER,
  @name NVARCHAR(200),
  @email NVARCHAR(200),
  @phone NVARCHAR(50),
  @message NVARCHAR(1000)
AS
BEGIN
  SET NOCOUNT ON;

  BEGIN TRY
    /**
     * @validation Validate required parameter idVehicle
     * @throw {vehicleIdRequired}
     */
    IF (@idVehicle IS NULL)
    BEGIN
      ;THROW 51000, 'vehicleIdRequired', 1;
    END;

    /**
     * @validation Validate required parameter name
     * @throw {nameRequired}
     */
    IF (@name IS NULL OR LTRIM(RTRIM(@name)) = '')
    BEGIN
      ;THROW 51000, 'nameRequired', 1;
    END;

    /**
     * @validation Validate required parameter email
     * @throw {emailRequired}
     */
    IF (@email IS NULL OR LTRIM(RTRIM(@email)) = '')
    BEGIN
      ;THROW 51000, 'emailRequired', 1;
    END;

    /**
     * @validation Validate required parameter phone
     * @throw {phoneRequired}
     */
    IF (@phone IS NULL OR LTRIM(RTRIM(@phone)) = '')
    BEGIN
      ;THROW 51000, 'phoneRequired', 1;
    END;

    /**
     * @validation Validate required parameter message
     * @throw {messageRequired}
     */
    IF (@message IS NULL OR LTRIM(RTRIM(@message)) = '')
    BEGIN
      ;THROW 51000, 'messageRequired', 1;
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

    DECLARE @idContactForm INTEGER;

    /**
     * @rule {db-contact-form-creation} Create new contact form submission
     */
    BEGIN TRAN;
      INSERT INTO [functional].[contactForm]
      ([idVehicle], [name], [email], [phone], [message], [dateCreated], [processed])
      VALUES
      (@idVehicle, @name, @email, @phone, @message, GETUTCDATE(), 0);

      SET @idContactForm = SCOPE_IDENTITY();
    COMMIT TRAN;

    /**
     * @output {ContactFormCreated, 1, 1}
     * @column {INT} idContactForm - Created contact form identifier
     */
    SELECT @idContactForm AS [idContactForm];
  END TRY
  BEGIN CATCH
    IF (@@TRANCOUNT > 0)
    BEGIN
      ROLLBACK TRAN;
    END;

    THROW;
  END CATCH;
END;
GO