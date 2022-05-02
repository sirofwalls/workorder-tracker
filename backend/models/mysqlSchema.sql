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
(1, 'Admin', 'admin@email.com', '$2a$12$GeyyumGsCSBQWKTegtBgouas4jY9txnYo7nc/PEI3QgbuyekYRvpy', 'admin', '2022-05-01 18:54:02', '2022-05-02 15:25:35');

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
  `changeNotes` text NOT NULL,
  `jobNotes` text DEFAULT NULL,
  `verifyNetwork` tinyint(1) NOT NULL DEFAULT 0,
  `verifyWifi` tinyint(1) NOT NULL DEFAULT 0,
  `speedUp` int(11) NOT NULL DEFAULT 0,
  `speedDown` int(11) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `workorders`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

ALTER TABLE `workorders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;