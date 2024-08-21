-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:5222:5222
-- Generation Time: Aug 21, 2024 at 06:10 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fuel`
--

-- --------------------------------------------------------

--
-- Table structure for table `cash_sales`
--

CREATE TABLE `cash_sales` (
  `id` int(11) NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `volume_sold` float DEFAULT NULL,
  `rate` float DEFAULT NULL,
  `total_amount` float DEFAULT NULL,
  `sale_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `phone`, `address`, `created_at`, `updated_at`) VALUES
(1, 'abdulqadir mohamed', '+252907592523', 'hlg-za-217', '2024-08-18 14:08:06', '2024-08-18 14:08:06'),
(2, 'Fatima Abdi', '7335903', NULL, '2024-08-18 14:35:36', '2024-08-18 14:35:36'),
(4, 'Maskaxmaal', '39399393', 'HLG-ZA-217', '2024-08-20 13:47:56', '2024-08-20 13:47:56');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `purchase_id` int(11) DEFAULT NULL,
  `total_amount` float DEFAULT NULL,
  `paid_amount` float DEFAULT NULL,
  `due_amount` float DEFAULT NULL,
  `invoice_date` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `purchase_id`, `total_amount`, `paid_amount`, `due_amount`, `invoice_date`) VALUES
(1, 3, 19, 15, 10, '2024-08-18 11:59:20'),
(2, 2, 5, 10, 5, '2024-08-20 18:59:02'),
(3, 1, 200, 150, NULL, '2024-08-20 18:59:07');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `item_name` varchar(25) DEFAULT NULL,
  `item_description` varchar(255) DEFAULT NULL,
  `open_meter_reading` float DEFAULT NULL,
  `close_meter_reading` float DEFAULT NULL,
  `volume` float DEFAULT NULL,
  `item_rate` float DEFAULT NULL,
  `evaporation_loss` float DEFAULT NULL,
  `receiving_tank` varchar(25) DEFAULT NULL,
  `entry_date` timestamp NULL DEFAULT current_timestamp(),
  `item_price` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `item_name`, `item_description`, `open_meter_reading`, `close_meter_reading`, `volume`, `item_rate`, `evaporation_loss`, `receiving_tank`, `entry_date`, `item_price`) VALUES
(1, 'Diesel', 'Standard kerosene', 7500, 7800, 300, 1.2, 4, 'C', '2024-08-18 18:33:07', 100),
(2, 'Gas', 'Liquefied petroleum gas', 12000, 12250, 250, 1.7, 2.5, 'D', '2024-08-18 12:29:06', 100),
(3, 'Diesel', 'Ultra-low sulfur diesel', 10500, 10800, 300, 1.5, 5, 'a', '2024-08-19 19:34:12', 100),
(4, 'petrol', NULL, 20000, 20250, 250, 1.6, 3, 'b', '2024-08-19 19:36:39', 2000),
(5, 'kerosene', NULL, 10200, 10400, 250, 1.5, 5, 'b', '2024-08-20 10:43:54', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `purchase_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `item_id`, `customer_id`, `purchase_date`) VALUES
(1, 1, 1, NULL),
(2, 1, 1, NULL),
(3, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `sale_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `volume` decimal(10,2) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `sale_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`sale_id`, `customer_id`, `item_id`, `volume`, `total_amount`, `sale_date`) VALUES
(1, 2, 1, 10.00, 5.00, '2024-08-18 11:35:36'),
(2, 1, 1, 30.00, 15.00, '2024-08-18 18:48:28'),
(3, 2, 1, 5.00, 14.00, '2024-08-19 10:55:17'),
(4, 2, 2, 100.00, 100.00, '2024-08-20 09:56:50'),
(5, 2, 5, 100.00, 100.00, '2024-08-19 10:49:16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(3, 'test', 'test@gmail.com', '$2b$10$JRWpDvKVAkpze6H5bONcpemXlEq5BS5gJi0.NPLDpR1ZN85oclHNO', '', '2024-08-18 03:42:09'),
(4, 'abdulqadir', 'abdi@gmail.com', '$2b$10$sNLbitbARtOtlcDjQFMB9uGCw0Y90pFqNVBxG/38c5wKynqpwW.DC', '', '2024-08-18 03:42:09'),
(5, 'fatima', 'fatima@gmail.com', '$2b$10$sT5PKA.foqx8Ta8u66WcDejFcLIhN0n7MOB2hvD9x9H9eaBizCczu', '', '2024-08-18 03:56:47'),
(6, 'Mario', 'mario@gmail.com', '$2b$10$S8Zrwm3C8XV7sO5nRXrX1eHkaDPbn3hcGsWErfZ76ddBkglKGpCnO', 'user', '2024-08-18 04:01:05'),
(7, 'Ahmed Warsame', 'admin@admin.com', '$2b$10$8MnCOuzW8DGiwSK8IfE2QebIsO7XvzG3DMdUnChxl4aF6gH4NWjfy', 'admin', '2024-08-20 10:48:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cash_sales`
--
ALTER TABLE `cash_sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_id` (`purchase_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`sale_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cash_sales`
--
ALTER TABLE `cash_sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `sale_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cash_sales`
--
ALTER TABLE `cash_sales`
  ADD CONSTRAINT `cash_sales_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`purchase_id`) REFERENCES `purchases` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
