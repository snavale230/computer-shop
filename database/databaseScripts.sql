-- 15 June 2024
-- Table: public.system_user
-- DROP TABLE IF EXISTS public.system_user;

CREATE TABLE IF NOT EXISTS public.system_user
(
    system_user_id character varying(55) COLLATE pg_catalog."default" NOT NULL,
    user_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    mobile character varying(55) COLLATE pg_catalog."default" NOT NULL,
    password character varying(20) COLLATE pg_catalog."default" NOT NULL,
    status character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT system_user_pkey PRIMARY KEY (system_user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.system_user
    OWNER to postgres;

INSERT INTO public.system_user(
	system_user_id, user_name, mobile, password, status)
	VALUES (1001, 'Shubham Navle', '7517513488', 'Shubham@123', 'ACTIVE');

CREATE TABLE IF NOT EXISTS public.products (
    product_id SERIAL PRIMARY KEY,  -- Automatically generates unique IDs
    product_name VARCHAR(255) NOT NULL,
    product_brand VARCHAR(255) NOT NULL,
    product_status VARCHAR(20) NOT NULL CHECK (product_status IN ('available', 'sold', 'discontinued')),  -- Ensures only valid statuses
    product_price DECIMAL(10, 2) NOT NULL,  -- Use DECIMAL for price to support cents
    product_quantity INT NOT NULL CHECK (product_quantity >= 0),  -- Ensures non-negative quantity
    product_description TEXT,  -- Detailed product description
    category VARCHAR(100),  -- Product category
    supplier_name VARCHAR(255),  -- Supplier name
    supplier_contact VARCHAR(255),  -- Supplier contact information
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Automatically sets the date added
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Automatically sets the last updated timestamp
);

-- Update trigger to automatically set last_updated timestamp
CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.last_updated = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_last_updated BEFORE UPDATE
ON public.products FOR EACH ROW
EXECUTE PROCEDURE update_last_updated_column();


-- Sales Table
CREATE TABLE IF NOT EXISTS public.sales (
    sale_id SERIAL PRIMARY KEY,  -- Automatically generates unique IDs
    product_id INT NOT NULL REFERENCES public.products(product_id),  -- Foreign key to products table
    sale_quantity INT NOT NULL CHECK (sale_quantity > 0),  -- Ensures positive sale quantity
    sale_price DECIMAL(10, 2) NOT NULL,  -- Price at the time of sale
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Automatically sets the sale date and time
    customer_name VARCHAR(255),  -- Optional: Store customer name
    customer_mobile VARCHAR(55)
); 

alter table sales drop column product_id
ALTER TABLE products ALTER COLUMN product_id TYPE varchar(55) USING product_id::varchar(55);


ALTER TABLE sales ADD COLUMN product_id varchar(55) NOT NULL REFERENCES public.products(product_id);

CREATE SEQUENCE product_seq START WITH 1 INCREMENT BY 1; 

ALTER TABLE products alter column product_id set DEFAULT concat('PI', nextval('product_seq'::regclass));


-- 22 June 2024
ALTER TABLE sales ALTER COLUMN sale_id TYPE varchar(55) USING sale_id::varchar(55);

CREATE SEQUENCE sales_seq START WITH 1 INCREMENT BY 1; 

ALTER TABLE sales alter column sale_id set DEFAULT concat('S', nextval('sales_seq'::regclass));