-- Correcciones necesarias para bases creadas con versiones anteriores.

ALTER TABLE turnos_reservas
CHANGE COLUMN IF EXISTS atentido atendido TINYINT UNSIGNED NOT NULL;

ALTER TABLE turnos_reservas
ADD COLUMN IF NOT EXISTS observaciones TEXT NULL;
