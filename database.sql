CREATE TABLE statistics (
    id SERIAL PRIMARY KEY,
    site_name VARCHAR(255) NOT NULL,
    visit_count INT NOT NULL,
    avg_load_time DECIMAL(10, 2) NOT NULL,
    bounce_rate DECIMAL(10, 2) NOT NULL,
    latitude VARCHAR(20),
    longitude VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
