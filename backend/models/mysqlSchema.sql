SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `clientNumber` int(11) NOT NULL,
  `clientName` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `techName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `techRole` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`id`, `techName`, `email`, `password`, `techRole`, `createdAt`, `updated_at`) VALUES
(1, 'Admin', 'admin@email.com', '$2a$12$rVzgyK5xyMGJjgCTQtRZ..HkLq6ujsytcjruIVQKl4rfYvNVAxnPu', 'admin', '2022-05-01 18:54:02', '2022-06-06 12:04:09'),
(6, 'Guest', 'guest@example.com', '$2a$12$lzl3hryN9V8B2e/6XzgPqOGPgvEMV1Ytb5PsFz.dFoA2GlRjogZWO', 'admin', '2022-06-06 12:02:10', '2022-06-06 12:09:52');

CREATE TABLE `workorders` (
  `id` int(11) NOT NULL,
  `techId` int(11) NOT NULL,
  `techName` varchar(100) NOT NULL,
  `clientName` varchar(100) NOT NULL,
  `clientNumber` int(11) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `milesTraveled` int(11) NOT NULL DEFAULT 0,
  `timeTraveled` int(11) NOT NULL DEFAULT 0,
  `changeNotes` text DEFAULT NULL,
  `jobNotes` text DEFAULT NULL,
  `verifyNetwork` tinyint(1) NOT NULL DEFAULT 0,
  `verifyWifi` tinyint(1) NOT NULL DEFAULT 0,
  `speedUp` int(11) NOT NULL DEFAULT 0,
  `speedDown` int(11) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `clientNumber` (`clientNumber`),
  ADD UNIQUE KEY `clientName` (`clientName`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `techName` (`techName`);

ALTER TABLE `workorders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `techName` (`techName`),
  ADD KEY `clientNumber` (`clientNumber`),
  ADD KEY `clientName` (`clientName`),
  ADD KEY `techId` (`techId`) USING BTREE;


ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `workorders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `workorders`
  ADD CONSTRAINT `workorders_ibfk_1` FOREIGN KEY (`techId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `workorders_ibfk_2` FOREIGN KEY (`techName`) REFERENCES `users` (`techName`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `workorders_ibfk_3` FOREIGN KEY (`clientNumber`) REFERENCES `clients` (`clientNumber`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `workorders_ibfk_4` FOREIGN KEY (`clientName`) REFERENCES `clients` (`clientName`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;
