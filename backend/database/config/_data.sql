/**
 * @load brand
 */
INSERT INTO [config].[brand]
([name], [code], [active])
VALUES
('Toyota', 'TOYOTA', 1),
('Honda', 'HONDA', 1),
('Ford', 'FORD', 1),
('Chevrolet', 'CHEVROLET', 1),
('Volkswagen', 'VOLKSWAGEN', 1),
('Fiat', 'FIAT', 1),
('Hyundai', 'HYUNDAI', 1),
('Nissan', 'NISSAN', 1),
('Renault', 'RENAULT', 1),
('Jeep', 'JEEP', 1);

/**
 * @load fuelType
 */
INSERT INTO [config].[fuelType]
([name], [code], [active])
VALUES
('Gasolina', 'GASOLINE', 1),
('Etanol', 'ETHANOL', 1),
('Flex', 'FLEX', 1),
('Diesel', 'DIESEL', 1),
('Elétrico', 'ELECTRIC', 1),
('Híbrido', 'HYBRID', 1),
('GNV', 'CNG', 1);

/**
 * @load transmission
 */
INSERT INTO [config].[transmission]
([name], [code], [active])
VALUES
('Manual', 'MANUAL', 1),
('Automático', 'AUTOMATIC', 1),
('Automatizado', 'AUTOMATED', 1),
('CVT', 'CVT', 1);

/**
 * @load color
 */
INSERT INTO [config].[color]
([name], [code], [hexCode], [active])
VALUES
('Branco', 'WHITE', '#FFFFFF', 1),
('Preto', 'BLACK', '#000000', 1),
('Prata', 'SILVER', '#C0C0C0', 1),
('Cinza', 'GRAY', '#808080', 1),
('Vermelho', 'RED', '#FF0000', 1),
('Azul', 'BLUE', '#0000FF', 1),
('Verde', 'GREEN', '#008000', 1),
('Amarelo', 'YELLOW', '#FFFF00', 1),
('Laranja', 'ORANGE', '#FFA500', 1),
('Marrom', 'BROWN', '#A52A2A', 1);
