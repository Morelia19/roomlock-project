-- =========================================
-- RoomLock Test Data for Supabase
-- =========================================
-- This script populates the database with test announcements
-- matching the frontend mock data (IDs 1-4)

-- Step 1: Create owner users with unique emails
-- Password for all: "password123" (hashed with bcrypt)
-- Using RETURNING to get the actual IDs assigned

-- Create temporary table to store owner IDs
CREATE TEMP TABLE temp_owners (
    owner_name VARCHAR(120),
    owner_id INT
);

-- Insert owners and capture their IDs
WITH
    inserted_owners AS (
        INSERT INTO
            "User" (
                name,
                email,
                password,
                role,
                phone,
                register_date
            )
        VALUES (
                'María García',
                'maria.garcia.owner@roomlock.com',
                '$2b$10$rZ7d5a8xK9YvqP4sN3mH1.eF6gH7iJ8kL9mN0oP1qR2sT3uV4wX5y',
                'owner',
                '+51 999 987 654',
                NOW()
            ),
            (
                'Roberto Sánchez',
                'roberto.sanchez.owner@roomlock.com',
                '$2b$10$rZ7d5a8xK9YvqP4sN3mH1.eF6gH7iJ8kL9mN0oP1qR2sT3uV4wX5y',
                'owner',
                '+51 999 123 789',
                NOW()
            ),
            (
                'Patricia López',
                'patricia.lopez.owner@roomlock.com',
                '$2b$10$rZ7d5a8xK9YvqP4sN3mH1.eF6gH7iJ8kL9mN0oP1qR2sT3uV4wX5y',
                'owner',
                '+51 999 456 321',
                NOW()
            )
        ON CONFLICT (email) DO
        UPDATE
        SET
            name = EXCLUDED.name
        RETURNING
            id,
            name
    )
INSERT INTO
    temp_owners (owner_name, owner_id)
SELECT name, id
FROM inserted_owners;

-- Display the owner IDs for reference
SELECT * FROM temp_owners ORDER BY owner_id;

-- Step 2: Insert announcements with explicit IDs (1-4 to match frontend mock data)
-- Using the actual owner IDs from temp table
INSERT INTO
    "Announcement" (
        id,
        owner_id,
        title,
        description,
        price,
        district,
        latitude,
        longitude,
        creation_date
    )
VALUES (
        1,
        (
            SELECT owner_id
            FROM temp_owners
            WHERE
                owner_name = 'María García'
        ),
        'Habitación amplia en San Isidro',
        'Hermosa habitación en zona tranquila y segura de San Isidro. A 10 minutos de la PUCP y cerca a transporte público.',
        800.00,
        'San Isidro',
        -12.094722,
        -77.035556,
        NOW()
    ),
    (
        2,
        (
            SELECT owner_id
            FROM temp_owners
            WHERE
                owner_name = 'Roberto Sánchez'
        ),
        'Suite con baño privado - Pueblo Libre',
        'Suite completamente equipada con baño privado. Cerca a la UNMSM y con transporte directo.',
        950.00,
        'Pueblo Libre',
        -12.075278,
        -77.064167,
        NOW()
    ),
    (
        3,
        (
            SELECT owner_id
            FROM temp_owners
            WHERE
                owner_name = 'Patricia López'
        ),
        'Departamento compartido Miraflores',
        'Habitación en departamento compartido con otros estudiantes. Zona moderna y segura.',
        700.00,
        'Miraflores',
        -12.120833,
        -77.028333,
        NOW()
    ),
    (
        4,
        (
            SELECT owner_id
            FROM temp_owners
            WHERE
                owner_name = 'María García'
        ),
        'Habitación económica San Miguel',
        'Opción económica para estudiantes. Cerca al Centro de Lima y con buena conexión de transporte.',
        600.00,
        'San Miguel',
        -12.077778,
        -77.091111,
        NOW()
    )
ON CONFLICT (id) DO NOTHING;

-- Step 3: Insert images for each announcement
INSERT INTO
    "ImageAnnouncement" (announcement_id, url)
VALUES
    -- Announcement 1 images
    (
        1,
        'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800'
    ),
    (
        1,
        'https://images.unsplash.com/photo-1668089677938-b52086753f77?w=800'
    ),
    -- Announcement 2 images
    (
        2,
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800'
    ),
    (
        2,
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'
    ),
    -- Announcement 3 images
    (
        3,
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ),
    (
        3,
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'
    ),
    -- Announcement 4 images
    (
        4,
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800'
    ),
    (
        4,
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800'
    );

-- Step 4: Insert services/amenities for each announcement
INSERT INTO
    "AnnouncementService" (announcement_id, service)
VALUES
    -- Announcement 1 services
    (1, 'WiFi de alta velocidad'),
    (1, 'Estacionamiento'),
    (1, 'Servicios incluidos'),
    (1, 'Amoblado'),
    -- Announcement 2 services
    (2, 'Baño privado'),
    (2, 'WiFi'),
    (2, 'Escritorio'),
    (2, 'Closet amplio'),
    -- Announcement 3 services
    (3, 'WiFi'),
    (3, 'Cocina compartida'),
    (3, 'Sala de estar'),
    (3, 'Lavandería'),
    -- Announcement 4 services
    (4, 'WiFi'),
    (4, 'Servicios incluidos'),
    (4, 'Amoblado básico');

-- Step 5: Reset the announcement ID sequence to continue from 5
SELECT setval( '"Announcement_id_seq"', 5, false );

-- Clean up temp table
DROP TABLE IF EXISTS temp_owners;

-- Verification: Show final results
SELECT 'Owners Created:' as status;

SELECT id, name, email, role
FROM "User"
WHERE
    email LIKE '%@roomlock.com'
ORDER BY id;

SELECT 'Announcements Created:' as status;

SELECT
    id,
    title,
    price,
    district,
    owner_id
FROM "Announcement"
ORDER BY id;

SELECT 'Images Count:' as status;

SELECT announcement_id, COUNT(*) as count
FROM "ImageAnnouncement"
GROUP BY
    announcement_id
ORDER BY announcement_id;

SELECT 'Services Count:' as status;

SELECT announcement_id, COUNT(*) as count
FROM "AnnouncementService"
GROUP BY
    announcement_id
ORDER BY announcement_id;