-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 23, 2024 at 01:32 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tes_edii`
--

-- --------------------------------------------------------

--
-- Table structure for table `Biodata`
--

CREATE TABLE `Biodata` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `posisi` varchar(255) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `ktp` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Biodata`
--

INSERT INTO `Biodata` (`id`, `user_id`, `posisi`, `nama`, `ktp`, `alamat`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Super Admin', 'Admin Backend', '2222', 'Jl.Admin 1234', '2024-08-22 20:44:45', '2024-08-22 21:05:34'),
(2, 2, 'Backend', 'Ezyh Dzikron Arofi', '4444', 'Jl.Hasanudin H.80 Semarang', '2024-08-22 22:51:26', '2024-08-22 22:51:26');

-- --------------------------------------------------------

--
-- Table structure for table `Pekerjaans`
--

CREATE TABLE `Pekerjaans` (
  `id` int(11) NOT NULL,
  `biodata_id` int(11) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `posisi` varchar(255) DEFAULT NULL,
  `pendapatan` int(11) DEFAULT NULL,
  `tahun` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Pekerjaans`
--

INSERT INTO `Pekerjaans` (`id`, `biodata_id`, `nama`, `posisi`, `pendapatan`, `tahun`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'PT EDII', 'Backend Developer', 8000000, 2024, '2024-08-22 22:58:05', '2024-08-22 22:59:23'),
(2, 2, 'Web Developer', 'Nexa', 8000000, 2024, '2024-08-22 23:00:15', '2024-08-22 23:00:15');

-- --------------------------------------------------------

--
-- Table structure for table `Pelatihans`
--

CREATE TABLE `Pelatihans` (
  `id` int(11) NOT NULL,
  `biodata_id` int(11) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `sertifikat` tinyint(1) DEFAULT NULL,
  `tahun` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Pelatihans`
--

INSERT INTO `Pelatihans` (`id`, `biodata_id`, `nama`, `sertifikat`, `tahun`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'Fullstack Web', 1, 2021, '2024-08-22 23:04:45', '2024-08-22 23:05:43');

-- --------------------------------------------------------

--
-- Table structure for table `Pendidikans`
--

CREATE TABLE `Pendidikans` (
  `id` int(11) NOT NULL,
  `biodata_id` int(11) DEFAULT NULL,
  `jenjang` varchar(255) DEFAULT NULL,
  `institusi` varchar(255) DEFAULT NULL,
  `jurusan` varchar(255) DEFAULT NULL,
  `tahun_lulus` int(11) DEFAULT NULL,
  `ipk` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Pendidikans`
--

INSERT INTO `Pendidikans` (`id`, `biodata_id`, `jenjang`, `institusi`, `jurusan`, `tahun_lulus`, `ipk`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'Diploma IV', 'Polines', 'Teknik Telekomunikasi', 2023, 3, '2024-08-22 23:11:12', '2024-08-22 23:14:01');

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20240822121749-create-user.js'),
('20240822122047-create-biodata.js'),
('20240822122235-create-pendidikan.js'),
('20240822122420-create-pelatihan.js'),
('20240822122518-create-pekerjaan.js');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `username`, `password`, `role`, `token`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '$2b$05$/3QhVUR7O91AwJp68XS8ruW0n3dd7sdMhhMoPM9.aRCLAAypCXgm2', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOjEsImlhdCI6MTcyNDM2NzEzOSwiZXhwIjoxNzI2OTU5MTM5fQ.HpPcjhxgx8SV9f76Lu9yy6XV5RHLojGw9wVo3P6L61Y', '2024-08-22 20:44:28', '2024-08-22 22:52:19'),
(2, 'ezyh', '$2b$05$7.8NTnW1GJbxjC.V5W27xeYRx9O/3IUqYGzVAVJ8bErhwiGfRgik2', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJlenloIiwicm9sZSI6MiwiaWF0IjoxNzI0MzY5MTY2LCJleHAiOjE3MjY5NjExNjZ9.pz-oIhN6qVNgWrORUc2CSCPttvgNPdEv4JsnSqjSnaM', '2024-08-22 22:50:31', '2024-08-22 23:26:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Biodata`
--
ALTER TABLE `Biodata`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Pekerjaans`
--
ALTER TABLE `Pekerjaans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `biodata_id` (`biodata_id`);

--
-- Indexes for table `Pelatihans`
--
ALTER TABLE `Pelatihans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `biodata_id` (`biodata_id`);

--
-- Indexes for table `Pendidikans`
--
ALTER TABLE `Pendidikans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `biodata_id` (`biodata_id`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Biodata`
--
ALTER TABLE `Biodata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Pekerjaans`
--
ALTER TABLE `Pekerjaans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Pelatihans`
--
ALTER TABLE `Pelatihans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Pendidikans`
--
ALTER TABLE `Pendidikans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Biodata`
--
ALTER TABLE `Biodata`
  ADD CONSTRAINT `biodata_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Pekerjaans`
--
ALTER TABLE `Pekerjaans`
  ADD CONSTRAINT `pekerjaans_ibfk_1` FOREIGN KEY (`biodata_id`) REFERENCES `Biodata` (`id`);

--
-- Constraints for table `Pelatihans`
--
ALTER TABLE `Pelatihans`
  ADD CONSTRAINT `pelatihans_ibfk_1` FOREIGN KEY (`biodata_id`) REFERENCES `Biodata` (`id`);

--
-- Constraints for table `Pendidikans`
--
ALTER TABLE `Pendidikans`
  ADD CONSTRAINT `pendidikans_ibfk_1` FOREIGN KEY (`biodata_id`) REFERENCES `Biodata` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
