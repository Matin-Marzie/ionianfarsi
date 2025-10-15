-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 15, 2025 at 02:55 PM
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
-- Database: `sql7788068`
--

-- --------------------------------------------------------

--
-- Table structure for table `challenges`
--

CREATE TABLE `challenges` (
  `id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `media_type` enum('picture_audio_writtenform_englishequivalent','picture_audio_writtenform','picture_audio','picture','audio','transliteration','writtenform','writtenform_audio_englishequivalent','english_equivalent','dialogue') DEFAULT NULL,
  `word_id` int(11) DEFAULT NULL,
  `sentence_id` int(11) DEFAULT NULL,
  `dialogue_id` int(11) DEFAULT NULL,
  `challenge_type` enum('match','select','sort','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `challenges_in_lesson`
--

CREATE TABLE `challenges_in_lesson` (
  `challenge_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `challenge_order` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `challenge_match`
--

CREATE TABLE `challenge_match` (
  `id` int(11) NOT NULL,
  `match_type` enum('picture_to_writtenform','writtenform_to_englishequivalent','sound_to_writtenform','writtenform_to_transliteration','writtenfrom_audio_to_englishequivalent') DEFAULT NULL,
  `challenge_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `challenge_match_items`
--

CREATE TABLE `challenge_match_items` (
  `challenge_match_id` int(11) NOT NULL,
  `word_id` int(11) DEFAULT NULL,
  `sentence_id` int(11) DEFAULT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `challenge_select`
--

CREATE TABLE `challenge_select` (
  `id` int(11) NOT NULL,
  `select_type` enum('sequential_audio_writtenform','sequential_audio_englishequivalent','card_audio_writtenform','card_writtenform','card_audio_picture','card_picture','card_audio_transliteration','card_transliteration','sequential_englishequivalent','card_englishequivalent') DEFAULT NULL,
  `question` varchar(250) DEFAULT NULL,
  `challenge_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `challenge_select_options`
--

CREATE TABLE `challenge_select_options` (
  `id` int(11) NOT NULL,
  `challenge__select_id` int(11) NOT NULL,
  `word_id` int(11) DEFAULT NULL,
  `sentence_id` int(11) DEFAULT NULL,
  `correct` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `challenge_sort`
--

CREATE TABLE `challenge_sort` (
  `id` int(11) NOT NULL,
  `sort_type` enum('letters','letters_with_audio','words','english_equivalent') DEFAULT NULL,
  `sentence_id` int(11) DEFAULT NULL,
  `word_id` int(11) DEFAULT NULL,
  `challenge_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `characters`
--

CREATE TABLE `characters` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `avatar_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dialogues`
--

CREATE TABLE `dialogues` (
  `id` int(11) NOT NULL,
  `lesson_id` int(11) DEFAULT NULL,
  `video_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dialogue_lines`
--

CREATE TABLE `dialogue_lines` (
  `id` int(11) NOT NULL,
  `dialogue_id` int(11) NOT NULL,
  `character_id` int(11) DEFAULT NULL,
  `sentence_id` int(11) DEFAULT NULL,
  `challenge_id` int(11) DEFAULT NULL,
  `start_time_ms` int(11) NOT NULL,
  `end_time_ms` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `type` enum('challenges','watch_video') NOT NULL DEFAULT 'challenges',
  `lesson_order` int(2) NOT NULL,
  `repetition_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `letters`
--

CREATE TABLE `letters` (
  `id` int(11) NOT NULL,
  `writing_style` varchar(128) NOT NULL,
  `letter_sign` varchar(32) DEFAULT NULL,
  `english_example` varchar(16) DEFAULT NULL,
  `persian_example` varchar(255) NOT NULL,
  `type` enum('consonant','vowel') NOT NULL,
  `audio_url` varchar(250) DEFAULT NULL,
  `image_url` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `repetitions`
--

CREATE TABLE `repetitions` (
  `id` int(11) NOT NULL,
  `titile` varchar(50) DEFAULT NULL,
  `repetition_type` enum('watch_video','challenges_repetition_1','challenges_repetition_2','challenges_repetition_3','challenges_repetition_4') NOT NULL DEFAULT 'challenges_repetition_1',
  `repetition_order` int(2) NOT NULL,
  `unit_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `level` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sentences`
--

CREATE TABLE `sentences` (
  `id` int(11) NOT NULL,
  `written_form` varchar(250) DEFAULT NULL,
  `transliteration` varchar(255) DEFAULT NULL,
  `english_equivalent` varchar(250) DEFAULT NULL,
  `image_url` varchar(250) DEFAULT NULL,
  `audio_url` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sentence_matches`
--

CREATE TABLE `sentence_matches` (
  `sentence_left_id` int(11) NOT NULL,
  `sentence_right_id` int(11) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `unit_order` int(3) NOT NULL,
  `section_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `name` varchar(35) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `experience` int(11) NOT NULL DEFAULT 0,
  `level` enum('N','A1','A2','B1','B2','C1','C2') NOT NULL DEFAULT 'N',
  `coin` int(6) DEFAULT 0,
  `energy` tinyint(4) DEFAULT 5,
  `profile_picture_url` varchar(255) DEFAULT NULL,
  `section_id` int(11) NOT NULL DEFAULT 1,
  `unit_id` int(11) NOT NULL DEFAULT 1,
  `repetition_id` int(1) NOT NULL DEFAULT 1,
  `lesson_id` int(11) NOT NULL DEFAULT 1,
  `last_login` datetime NOT NULL,
  `joined_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `duration` int(11) DEFAULT NULL,
  `title` varchar(55) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `words`
--

CREATE TABLE `words` (
  `id` int(11) NOT NULL,
  `written_form` varchar(255) DEFAULT NULL,
  `english_equivalent` varchar(255) DEFAULT NULL,
  `transliteration` varchar(255) DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf32 COLLATE utf32_persian_ci DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `audio_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `words_in_sentence`
--

CREATE TABLE `words_in_sentence` (
  `word_id` int(11) NOT NULL,
  `sentence_id` int(11) NOT NULL,
  `position` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk1_challenge_word_id` (`word_id`),
  ADD KEY `fk_2_challenge_sentence_id` (`sentence_id`);

--
-- Indexes for table `challenges_in_lesson`
--
ALTER TABLE `challenges_in_lesson`
  ADD PRIMARY KEY (`challenge_id`,`lesson_id`,`challenge_order`),
  ADD KEY `fk2_lesson_id` (`lesson_id`);

--
-- Indexes for table `challenge_match`
--
ALTER TABLE `challenge_match`
  ADD PRIMARY KEY (`id`),
  ADD KEY `challenge_id` (`challenge_id`);

--
-- Indexes for table `challenge_match_items`
--
ALTER TABLE `challenge_match_items`
  ADD UNIQUE KEY `unique_match` (`challenge_match_id`,`word_id`,`sentence_id`),
  ADD KEY `fk2_word_id` (`word_id`),
  ADD KEY `fk3_sentence_id` (`sentence_id`);

--
-- Indexes for table `challenge_select`
--
ALTER TABLE `challenge_select`
  ADD PRIMARY KEY (`id`),
  ADD KEY `challenge_id` (`challenge_id`);

--
-- Indexes for table `challenge_select_options`
--
ALTER TABLE `challenge_select_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_1_challenge_select_id` (`challenge__select_id`),
  ADD KEY `fk_2_word_id` (`word_id`),
  ADD KEY `fk_3_sentence_id` (`sentence_id`);

--
-- Indexes for table `challenge_sort`
--
ALTER TABLE `challenge_sort`
  ADD PRIMARY KEY (`id`),
  ADD KEY `challenge_id` (`challenge_id`),
  ADD KEY `challenge_sort_ibfk_2` (`sentence_id`),
  ADD KEY `challenge_sort_ibfk_3` (`word_id`);

--
-- Indexes for table `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dialogues`
--
ALTER TABLE `dialogues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk1_dialogue_lesson` (`lesson_id`),
  ADD KEY `fk2_dialogue_video` (`video_id`);

--
-- Indexes for table `dialogue_lines`
--
ALTER TABLE `dialogue_lines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dialogue_id` (`dialogue_id`),
  ADD KEY `character_id` (`character_id`),
  ADD KEY `sentence_id` (`sentence_id`),
  ADD KEY `dialogue_lines_ibfk_4` (`challenge_id`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lesson_in_repetition` (`repetition_id`);

--
-- Indexes for table `letters`
--
ALTER TABLE `letters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `writing_style` (`writing_style`),
  ADD KEY `writing_style_2` (`writing_style`);

--
-- Indexes for table `repetitions`
--
ALTER TABLE `repetitions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `repetitions_in_unit` (`unit_id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sentences`
--
ALTER TABLE `sentences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sentence_matches`
--
ALTER TABLE `sentence_matches`
  ADD UNIQUE KEY `unique_pair` (`sentence_left_id`,`sentence_right_id`),
  ADD KEY `fk_right_sentence` (`sentence_right_id`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `google_id` (`google_id`),
  ADD KEY `current_section` (`section_id`),
  ADD KEY `current_unit` (`unit_id`),
  ADD KEY `current_lesson` (`lesson_id`),
  ADD KEY `repetition_id` (`repetition_id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `words`
--
ALTER TABLE `words`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `words_in_sentence`
--
ALTER TABLE `words_in_sentence`
  ADD PRIMARY KEY (`word_id`,`sentence_id`),
  ADD KEY `words_in_sentence_ibfk_1` (`sentence_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `challenges`
--
ALTER TABLE `challenges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `challenge_match`
--
ALTER TABLE `challenge_match`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `challenge_select`
--
ALTER TABLE `challenge_select`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `challenge_select_options`
--
ALTER TABLE `challenge_select_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `challenge_sort`
--
ALTER TABLE `challenge_sort`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `characters`
--
ALTER TABLE `characters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dialogues`
--
ALTER TABLE `dialogues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dialogue_lines`
--
ALTER TABLE `dialogue_lines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `letters`
--
ALTER TABLE `letters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `repetitions`
--
ALTER TABLE `repetitions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sentences`
--
ALTER TABLE `sentences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `words`
--
ALTER TABLE `words`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `challenges`
--
ALTER TABLE `challenges`
  ADD CONSTRAINT `fk1_challenge_word_id` FOREIGN KEY (`word_id`) REFERENCES `words` (`id`),
  ADD CONSTRAINT `fk_2_challenge_sentence_id` FOREIGN KEY (`sentence_id`) REFERENCES `sentences` (`id`);

--
-- Constraints for table `challenges_in_lesson`
--
ALTER TABLE `challenges_in_lesson`
  ADD CONSTRAINT `challenge` FOREIGN KEY (`challenge_id`) REFERENCES `challenges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk2_lesson_id` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lesson` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `challenge_match`
--
ALTER TABLE `challenge_match`
  ADD CONSTRAINT `challenge_match_ibfk_1` FOREIGN KEY (`challenge_id`) REFERENCES `challenges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `challenge_match_items`
--
ALTER TABLE `challenge_match_items`
  ADD CONSTRAINT `fk1_challenge_match_id` FOREIGN KEY (`challenge_match_id`) REFERENCES `challenge_match` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk2_word_id` FOREIGN KEY (`word_id`) REFERENCES `words` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk3_sentence_id` FOREIGN KEY (`sentence_id`) REFERENCES `sentences` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `challenge_select`
--
ALTER TABLE `challenge_select`
  ADD CONSTRAINT `challenge_select_ibfk_1` FOREIGN KEY (`challenge_id`) REFERENCES `challenges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `challenge_select_options`
--
ALTER TABLE `challenge_select_options`
  ADD CONSTRAINT `fk_1_challenge_select_id` FOREIGN KEY (`challenge__select_id`) REFERENCES `challenge_select` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_2_word_id` FOREIGN KEY (`word_id`) REFERENCES `words` (`id`),
  ADD CONSTRAINT `fk_3_sentence_id` FOREIGN KEY (`sentence_id`) REFERENCES `sentences` (`id`);

--
-- Constraints for table `challenge_sort`
--
ALTER TABLE `challenge_sort`
  ADD CONSTRAINT `challenge_sort_ibfk_1` FOREIGN KEY (`challenge_id`) REFERENCES `challenges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `challenge_sort_ibfk_2` FOREIGN KEY (`sentence_id`) REFERENCES `sentences` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `challenge_sort_ibfk_3` FOREIGN KEY (`word_id`) REFERENCES `words` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dialogues`
--
ALTER TABLE `dialogues`
  ADD CONSTRAINT `fk1_dialogue_lesson` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk2_dialogue_video` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `dialogue_lines`
--
ALTER TABLE `dialogue_lines`
  ADD CONSTRAINT `dialogue_lines_ibfk_1` FOREIGN KEY (`dialogue_id`) REFERENCES `dialogues` (`id`),
  ADD CONSTRAINT `dialogue_lines_ibfk_2` FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`),
  ADD CONSTRAINT `dialogue_lines_ibfk_3` FOREIGN KEY (`sentence_id`) REFERENCES `sentences` (`id`),
  ADD CONSTRAINT `dialogue_lines_ibfk_4` FOREIGN KEY (`challenge_id`) REFERENCES `challenges` (`id`);

--
-- Constraints for table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lesson_in_repetition` FOREIGN KEY (`repetition_id`) REFERENCES `repetitions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `repetitions`
--
ALTER TABLE `repetitions`
  ADD CONSTRAINT `repetitions_in_unit` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `sentence_matches`
--
ALTER TABLE `sentence_matches`
  ADD CONSTRAINT `fk_left_sentence` FOREIGN KEY (`sentence_left_id`) REFERENCES `sentences` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_right_sentence` FOREIGN KEY (`sentence_right_id`) REFERENCES `sentences` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `units`
--
ALTER TABLE `units`
  ADD CONSTRAINT `units_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `lesson_id_fk4` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `repetition_id` FOREIGN KEY (`repetition_id`) REFERENCES `repetitions` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `section_id_fk2` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `unit_id_fk3` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `words_in_sentence`
--
ALTER TABLE `words_in_sentence`
  ADD CONSTRAINT `words_in_sentence_ibfk_1` FOREIGN KEY (`sentence_id`) REFERENCES `sentences` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `words_in_sentence_ibfk_2` FOREIGN KEY (`word_id`) REFERENCES `words` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
