-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 04, 2025 at 04:59 PM
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

--
-- Dumping data for table `challenges`
--

INSERT INTO `challenges` (`id`, `question`, `media_type`, `word_id`, `sentence_id`, `dialogue_id`, `challenge_type`) VALUES
(1, '', 'dialogue', NULL, NULL, 1, 'sort');

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
  `match_type` enum('picture_to_writtenform','writtenform_to_englishequivalent','sound_to_writtenform','writtenform_to_transliteration') DEFAULT NULL,
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
  `select_type` enum('sequential_audio_writtenform','sequential_audio_englishequivalent','card_audio_writtenform','card_writtenform','card_audio_picture','card_picture','card_audio_transliteration','card_transliteration') DEFAULT NULL,
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

--
-- Dumping data for table `characters`
--

INSERT INTO `characters` (`id`, `name`, `avatar_url`) VALUES
(1, 'مَریَم', NULL),
(2, 'سیما', NULL);

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

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `title`, `type`, `lesson_order`, `repetition_id`) VALUES
(1, 'lesson with challenges', 'challenges', 1, 1),
(2, '2', 'challenges', 1, 2),
(3, 'lesson 3 has no title', 'challenges', 3, 2),
(4, '', 'challenges', 1, 3),
(5, '', 'challenges', 2, 3),
(6, 'No title', 'challenges', 2, 2),
(16, 'No title', 'challenges', 1, NULL),
(17, '', 'challenges', 4, 2),
(18, '', 'challenges', 1, 4),
(19, '', 'challenges', 2, 4),
(20, '', 'challenges', 1, 5),
(21, '', 'challenges', 2, 5),
(22, '', 'challenges', 1, NULL),
(23, '', 'challenges', 1, NULL),
(24, '', 'challenges', 1, NULL);

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

--
-- Dumping data for table `letters`
--

INSERT INTO `letters` (`id`, `writing_style`, `letter_sign`, `english_example`, `persian_example`, `type`, `audio_url`, `image_url`) VALUES
(1, 'ا', NULL, 'on, God', 'بابا، آب', 'vowel', 'https://ionianfarsi.onrender.com/audio/letters/aa.mp3', NULL),
(2, 'ب', NULL, 'book', 'باران', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/b.mp3', NULL),
(3, 'َ', NULL, 'cat', 'دَر', 'vowel', 'https://ionianfarsi.onrender.com/audio/letters/a.mp3', NULL),
(4, 'ی ای', NULL, 'happy', 'دیر، ایران', 'vowel', 'https://ionianfarsi.onrender.com/audio/letters/i.mp3', NULL),
(5, 'پ', NULL, 'pen', 'پا', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/p.mp3', NULL),
(6, 'ت', NULL, 'ten', 'توپ', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/t.mp3', NULL),
(7, 'اُ  ُ', NULL, 'saw', 'اُردَک، پُر', 'vowel', NULL, NULL),
(8, 'س', NULL, 'rice, sad', 'سَبز', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/s.mp3', NULL),
(9, 'ش', NULL, 'she', 'شیر', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/sh.mp3', NULL),
(10, 'ِ', NULL, 'get', 'اِستَخر، سه', 'vowel', 'https://ionianfarsi.onrender.com/audio/letters/e.mp3', NULL),
(11, 'ر', NULL, 'red', 'رود', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/r.mp3', NULL),
(12, 'ز', NULL, 'zoo', 'زَنبور', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/z.mp3', NULL),
(13, 'او و', NULL, 'good', 'موش، گِردو', 'vowel', 'https://ionianfarsi.onrender.com/audio/letters/u.mp3', NULL),
(14, 'د', NULL, 'do', 'دود', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/d.mp3', NULL),
(15, 'ن', NULL, 'pen', 'نَمَک', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/n.mp3', NULL),
(16, 'م', NULL, 'milk', 'میز', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/m.mp3', NULL),
(17, 'ک', NULL, 'cat, ask', 'کِتاب', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/k.mp3', NULL),
(18, 'گ', NULL, 'get', 'گُل، سَگ', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/g.mp3', NULL),
(19, 'ل', NULL, 'ball, let', 'لَب،‌ پُل', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/l.mp3', NULL),
(20, 'و', NULL, 'very', 'وان', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/v.mp3', NULL),
(21, 'ُ', NULL, 'saw', '	\r\nاُردَک، پُر', 'vowel', 'https://ionianfarsi.onrender.com/audio/letters/o.mp3', NULL),
(22, 'ح', NULL, 'hit', 'حباب', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/h-jim.mp3', NULL),
(23, 'ج', NULL, 'job, age', 'جَنگَل', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/jim.mp3', NULL),
(24, 'خ', NULL, NULL, 'خِرس', 'consonant', NULL, NULL),
(25, 'چ', NULL, 'cheese', 'چِشم', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/ch.mp3', NULL),
(26, 'خوا', NULL, 'khanacademy', 'خواب', 'consonant', NULL, NULL),
(27, 'ف', NULL, 'food', 'فَرش، کَفش', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/f.mp3', NULL),
(28, 'ق', NULL, '-', 'قِرمِز، غَذا', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/gh.mp3', NULL),
(29, 'ّ', NULL, NULL, 'بَچّه', 'consonant', NULL, NULL),
(30, 'ه', NULL, 'hit', 'هِند،‌ حُباب', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/h.mp3', NULL),
(31, 'ی', NULL, 'yes', 'یَخ', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/y.mp3', NULL),
(32, 'ی+ی', NULL, NULL, 'خیار،‌ سیاه', 'consonant', NULL, NULL),
(33, 'ص', NULL, 'rice, sad', 'صابون', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/sad.mp3', NULL),
(34, 'ض', NULL, 'zoo', 'وضو', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/zad.mp3', NULL),
(35, 'ع', NULL, '-', 'عَسَل، ساعَت', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/ayn.mp3', NULL),
(36, 'غ', NULL, '-', 'غَذا', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/ghayn.mp3', NULL),
(37, 'ط', NULL, 'ten', 'طلا', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/t-daste-dar.mp3', NULL),
(38, 'ظ', NULL, 'zoo', 'ظرف', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/z-daste-dar.mp3', NULL),
(39, 'ژ', NULL, 'television', 'ژله، گاراژ', 'consonant', 'localhost:8081/audio/letters/zh.mp3', NULL),
(40, 'ذ', NULL, 'zoo', 'غَذا', 'consonant', 'localhost:8081/audio/letters/de-ze.mp3', NULL),
(41, 'ث', NULL, 'rice, sad', 'کَثیف', 'consonant', 'localhost:8081/audio/letters/s-senoghte.mp3', NULL),
(42, 'ئ أ ؤ', NULL, '-', 'رَئیس', 'consonant', 'localhost:8081/audio/letters/6.mp3', NULL);

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

--
-- Dumping data for table `repetitions`
--

INSERT INTO `repetitions` (`id`, `titile`, `repetition_type`, `repetition_order`, `unit_id`) VALUES
(1, NULL, 'watch_video', 1, 1),
(2, 'No title', 'challenges_repetition_1', 2, 1),
(3, NULL, 'challenges_repetition_2', 3, 1),
(4, NULL, 'challenges_repetition_3', 4, 1),
(5, NULL, 'challenges_repetition_4', 5, 1);

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

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `title`, `description`, `image_url`, `level`) VALUES
(1, 'Play with Letters, Dance with Words!', 'Learn the Alphabet and many words.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Farsi.svg/1280px-Farsi.svg.png', 'N'),
(2, 'سَلام عَلَیکُم', '', 'https://ionianfarsi.onrender.com/images/section-2.webp', 'Α1');

-- --------------------------------------------------------

--
-- Table structure for table `sentences`
--

CREATE TABLE `sentences` (
  `id` int(11) NOT NULL,
  `written_form` varchar(250) DEFAULT NULL,
  `written_form2` varchar(250) DEFAULT NULL,
  `written_form3` varchar(250) DEFAULT NULL,
  `transliteration` varchar(255) DEFAULT NULL,
  `english_equivalent` varchar(250) DEFAULT NULL,
  `image_url` varchar(250) DEFAULT NULL,
  `audio_url` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `sentences`
--

INSERT INTO `sentences` (`id`, `written_form`, `written_form2`, `written_form3`, `transliteration`, `english_equivalent`, `image_url`, `audio_url`) VALUES
(1, 'سلام', NULL, NULL, 'salam', 'Hello', '', ''),
(2, 'سلام. اسم من مریم است. اسم تو چیست؟', NULL, NULL, NULL, 'My name is Mary. What is your name', NULL, NULL),
(3, 'اسم من سیما است', NULL, NULL, NULL, 'My name is Sima', NULL, NULL),
(12, 'اسم تو چیست؟', NULL, NULL, 'esme to chist', 'What is your name', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJ_iqbUbz61hWFq12nmCbb13WhYnpfBSYkg&s', 'https://ionianfarsi.onrender.com/audio/lesson-1/babr.mp3'),
(13, 'اسم من مریم است', NULL, NULL, NULL, 'My name is Mary', 'My name is mary.', NULL);

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

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `title`, `description`, `unit_order`, `section_id`) VALUES
(1, 'Get Started', 'In this Unit we learn new letters, ا، ب، اَ', 1, 1),
(2, 'This is unit 2 with no title', 'This unit doesn\'t have description...', 2, 1),
(3, 'learn new letters', '', 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(35) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `experience` int(11) NOT NULL DEFAULT 0,
  `level` enum('N','A1','A2','B1','B2','C1','C2') NOT NULL DEFAULT 'N',
  `coin` int(6) DEFAULT NULL,
  `energy` tinyint(4) DEFAULT NULL,
  `profile_picture_url` varchar(255) DEFAULT NULL,
  `section_id` int(11) NOT NULL DEFAULT 1,
  `unit_id` int(11) NOT NULL DEFAULT 1,
  `repetition_id` int(1) NOT NULL DEFAULT 1,
  `lesson_id` int(11) NOT NULL DEFAULT 1,
  `joined_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `users`
--


-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `duration` int(11) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
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

--
-- Dumping data for table `words`
--

INSERT INTO `words` (`id`, `written_form`, `english_equivalent`, `transliteration`, `category`, `image_url`, `audio_url`) VALUES
(1, 'آب', 'water', 'aab', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/ab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/ab.mp3'),
(2, 'آبی', 'blue', 'aabi', 'نام رنگ، صفت', 'https://ionianfarsi.onrender.com/images/lesson-1/abi.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/abi.mp3'),
(3, 'بادام', 'almond', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/badam.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/badam.mp3'),
(4, 'پا', 'foot', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-1/pa.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/pa.mp3'),
(5, 'باران', 'rain', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/baran.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/baran.mp3'),
(6, 'باد', 'wind', 'baad', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/bad.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/bad.mp3'),
(7, 'پاندا', 'panda', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-1/panda.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/panda.mp3'),
(8, 'آسِمان', 'sky', 'aasemaan', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/aseman.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/aseman.mp3'),
(9, 'اَبر', 'cloud', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/abr.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/abr.mp3'),
(10, 'بَبر', 'tiger', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-1/babr.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/babr.mp3'),
(11, 'مُبل', 'sofa', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/mobl.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/mobl.mp3'),
(12, 'بازار', 'bazaar', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/bazar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/bazar.mp3'),
(13, 'قاب', 'frame', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/ghab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/ghab.mp3'),
(14, 'کَباب', 'kebab', NULL, 'اسم، غذا', 'https://ionianfarsi.onrender.com/images/lesson-1/kabab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/kabab.mp3'),
(15, 'سیب', 'apple', NULL, 'اسم، میوه', 'https://ionianfarsi.onrender.com/images/lesson-1/sib.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/sib.mp3'),
(16, 'بابا', 'daddy', 'baabaa', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/baba.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/baba.mp3'),
(17, 'اَسب', 'horse', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-1/asb.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/asb.mp3'),
(18, 'اَنگُشت', 'finger', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-1/angosht.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/angosht.mp3'),
(19, 'اَبرو', 'eyebrow', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-1/abru.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/abru.mp3'),
(20, 'اَنار', 'pomegranate', NULL, 'اسم، میوه', 'https://ionianfarsi.onrender.com/images/lesson-1/anar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/anar.mp3'),
(21, 'بَستَنی', 'ice cream', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/bastani.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/bastani.mp3'),
(22, 'اَنجیر', 'fig', NULL, 'اسم، میوه', 'https://ionianfarsi.onrender.com/images/lesson-1/anjir.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/anjir.mp3'),
(23, 'اَنگور', 'grape', NULL, 'اسم،‌ میوه', 'https://ionianfarsi.onrender.com/images/lesson-1/angur.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/angur.mp3'),
(24, 'سَبَد', 'basket', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/sabad.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/sabad.mp3'),
(25, 'ایران', 'Iran', NULL, 'اسم، کشور', 'https://ionianfarsi.onrender.com/images/lesson-2/iran.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/iran.mp3'),
(26, 'ایتالیا', 'Italy', NULL, 'اسم، کشور', 'https://ionianfarsi.onrender.com/images/lesson-2/italia.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/italia.mp3'),
(27, 'شیر', 'Iran', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-2/shir.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/shir.mp3'),
(28, 'توسی', 'gray', NULL, 'اسم، رنگ', 'https://ionianfarsi.onrender.com/images/lesson-2/tusi.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/tusi.mp3'),
(29, 'قَهوه ای', 'brown', NULL, 'اسم، رنگ', 'https://ionianfarsi.onrender.com/images/lesson-2/ghahvei.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/ghahvei.mp3'),
(30, 'لیوان', 'mug', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/livan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/livan.mp3'),
(31, 'روسَری', 'scarf', NULL, 'اسم، لباس', 'https://ionianfarsi.onrender.com/images/lesson-2/rusari.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/rusari.mp3'),
(32, 'سُرمه ای', 'navy blue', NULL, 'اسم، رنگ', 'https://ionianfarsi.onrender.com/images/lesson-2/sormei.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/sormei.mp3'),
(33, 'پَر', 'feather', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/par.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/par.mp3'),
(34, 'پاپ', 'Pope', NULL, 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-2/pap.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/pap.mp3'),
(35, 'ژاپُن', 'Japan', NULL, 'اسم، کشور', 'https://ionianfarsi.onrender.com/images/lesson-2/zhapon.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/zhapon.mp3'),
(36, 'آشپَز', 'cook', NULL, 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-2/ashpaz.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/ashpaz.mp3'),
(37, 'زیپ', 'zipper', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/zip.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/zip.mp3'),
(38, 'هَواپِیما', 'airplane', NULL, 'اسم، حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-2/havapeyma.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/havapeyma.mp3'),
(39, 'شامپو', 'shampoo', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/shampu.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/shampu.mp3'),
(40, 'سوپ', 'soup', NULL, 'اسم، غذا', 'https://ionianfarsi.onrender.com/images/lesson-2/sup.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/sup.mp3'),
(41, 'تاب', 'swing', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/tab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/tab.mp3'),
(42, 'توپ', 'ball', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/tup.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/tup.mp3'),
(43, 'آتَش', 'fire', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/atash.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/atash.mp3'),
(44, 'دُختَر', 'girl', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/dokhtar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/dokhtar.mp3'),
(45, 'دَست', 'hand', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-2/dast.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/dast.mp3'),
(46, 'اُتاق', 'room', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/otagh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/otagh.mp3'),
(47, 'کِتری', 'kettle', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/ketri.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/ketri.mp3'),
(48, 'سوت', 'whistle', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/sut.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/sut.mp3'),
(49, 'اُردَک', 'duck', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-3/ordak.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/ordak.mp3'),
(50, 'اُتاق', 'room', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/otagh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/otagh.mp3'),
(51, 'گُل', 'flower', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/gol.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/gol.mp3'),
(52, 'اُتو', 'iron', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/utu.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/utu.mp3'),
(53, 'رُز', 'rose', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/roz.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/roz.mp3'),
(54, 'بُز', 'goat', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-3/boz.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/boz.mp3'),
(55, 'اُروپا', 'Europe', NULL, 'اسم، قاره', 'https://ionianfarsi.onrender.com/images/lesson-3/urupa.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/urupa.mp3'),
(56, 'شُتُر', 'camel', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-3/shotor.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/shotor.mp3'),
(57, 'سَر', 'head', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-3/sar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/sar.mp3'),
(58, 'سَبز', 'green', NULL, 'اسم، رنگ', 'https://ionianfarsi.onrender.com/images/lesson-3/sabz.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/sabz.mp3'),
(59, 'دَستمال', 'tissue', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/dastmal.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/dastmal.mp3'),
(60, 'مِسواک', 'toothbrush', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/mesvak.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/mesvak.mp3'),
(61, 'پُلیس', 'police', NULL, 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-3/polis.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/polis.mp3'),
(62, 'سُرسُره', 'slide', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/sorsore.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/sorsore.mp3'),
(63, 'پِسَر', 'boy', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/pesar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/pesar.mp3'),
(64, 'کِلاس', 'class', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/kelas.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/kelas.mp3'),
(65, 'شَب', 'night', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/shab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/shab.mp3'),
(66, 'شیر', 'milk', NULL, 'اسم، نوشیدنی', 'https://ionianfarsi.onrender.com/images/lesson-3/shir.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/shir.mp3'),
(67, 'ماشین', 'car', NULL, 'اسم، حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-3/mashin.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/mashin.mp3'),
(68, 'کِشتی', 'ship', NULL, 'اسم، حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-3/keshti.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/keshti.mp3'),
(69, 'ریش', 'beard', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-3/rish.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/rish.mp3'),
(70, 'قاشُق', 'spoon', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/ghashogh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/ghashogh.mp3'),
(71, 'نَقشه', 'map', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/naghshe.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/naghshe.mp3'),
(72, 'تَراش', 'sharpener', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/tarash.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/tarash.mp3'),
(73, 'اِستَخر', 'swimming pool', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/estakhr.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/estakhr.mp3'),
(74, 'اِستِکان', 'glass', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/estekan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/estekan.mp3'),
(75, 'مِداد', 'pencil', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/medad.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/medad.mp3'),
(76, 'بَسته', 'pack', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/baste.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/baste.mp3'),
(77, 'پَرَنده', 'bird', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-4/parande.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/parande.mp3'),
(78, 'پِسته', 'pistachio', NULL, 'اسم، آجیل', 'https://ionianfarsi.onrender.com/images/lesson-4/peste.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/peste.mp3'),
(79, 'روزنامه', 'newspaper', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/ruzname.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/ruzname.mp3'),
(80, 'پَرده', 'curtain', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/parde.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/parde.mp3'),
(81, 'روستا', 'village', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/rusta.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/rusta.mp3'),
(82, 'رود', 'river', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/rud.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/rud.mp3'),
(83, 'پارو', 'oar', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/paru.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/paru.mp3'),
(84, 'مَرد', 'man', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/mard.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/mard.mp3'),
(85, 'سیر', 'garlic', NULL, 'اسم، گیاه', 'https://ionianfarsi.onrender.com/images/lesson-4/sir.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/sir.mp3'),
(86, 'جارو', 'sweep', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/jaru.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/jaru.mp3'),
(87, 'مُرغ', 'hen', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-4/morgh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/morgh.mp3'),
(88, 'زَنبور', 'bee', NULL, 'اسم، حشره', 'https://ionianfarsi.onrender.com/images/lesson-4/zanbur.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/zanbur.mp3'),
(89, 'زَبان', 'tongue', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-4/zaban.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/zaban.mp3'),
(90, 'زَن', 'woman', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/zan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/zan.mp3'),
(91, 'وَرزِش', 'sport', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/varzesh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/varzesh.mp3'),
(92, 'مَزرَعه', 'farm', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/mazrae.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/mazrae.mp3'),
(93, 'میز', 'table', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/miz.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/miz.mp3'),
(94, 'بازو', 'arm', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-4/bazu.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/bazu.mp3'),
(95, 'پِزِشک', 'doctor of medicine', NULL, 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-4/pezeshk.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/pezeshk.mp3'),
(96, 'روز', 'day', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/ruz.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/ruz.mp3'),
(97, 'او', 'he or she', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-5/u.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/u.mp3'),
(98, 'اوکراین', 'Ukraine', NULL, 'اسم، کشور', 'https://ionianfarsi.onrender.com/images/lesson-5/ukrain.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/ukrain.mp3'),
(99, 'دود', 'smoke', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-5/dud.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/dud.mp3'),
(100, 'کَبوتَر', 'pigeon', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-5/kabutar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/kabutar.mp3'),
(101, 'مو', 'hair', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-5/mu.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/mu.mp3'),
(102, 'رود', 'river', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-5/rud.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/rud.mp3'),
(103, 'تور', 'net', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-5/tur.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/tur.mp3'),
(104, 'گِردو', 'walnut', NULL, 'اسم، آجیل، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-5/gerdu.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/gerdu.mp3'),
(105, 'دَر', 'door', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-5/dar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/dar.mp3'),
(106, 'دَست', 'hand', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-5/dast.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/dast.mp3'),
(107, 'مادَر', 'mother', NULL, 'اسم، اعضای خانواده', 'https://ionianfarsi.onrender.com/images/lesson-5/madar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/madar.mp3'),
(108, 'پِدَر', 'father', NULL, 'اسم، اعضای خوانواده', 'https://ionianfarsi.onrender.com/images/lesson-5/pedar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/pedar.mp3'),
(109, 'سِفید', 'white', NULL, 'اسم، رنگ', 'https://ionianfarsi.onrender.com/images/lesson-5/sefid.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/sefid.mp3'),
(110, 'اِداره', 'office', NULL, 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-5/edare.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/edare.mp3'),
(111, 'مِداد', 'pencil', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-5/medad.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/medad.mp3'),
(112, 'زَرد', 'yellow', NULL, 'اسم، رنگ، صفت', 'https://ionianfarsi.onrender.com/images/lesson-5/zard.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/zard.mp3'),
(113, 'نُت', 'music note', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-6/not.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/not.mp3'),
(114, 'نوشابه', 'soft drink', NULL, 'اسم، نوشیدنی', 'https://ionianfarsi.onrender.com/images/lesson-6/nushabe.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/nushabe.mp3'),
(115, 'دَندان', 'tooth', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-6/dandan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/dandan.mp3'),
(116, 'بینی', 'nose', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-6/bini.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/bini.mp3'),
(117, 'دوربین', 'camera', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-6/durbin.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/durbin.mp3'),
(118, 'بانک', 'bank', NULL, 'اسم،‌ مکان', 'https://ionianfarsi.onrender.com/images/lesson-6/bank.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/bank.mp3'),
(119, 'بَستَنی', 'ice cream', NULL, 'اسم، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-6/bastani.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/bastani.mp3'),
(120, 'نان', 'bread', NULL, 'اسم، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-6/nan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/nan.mp3'),
(121, 'مِداد', 'pencil', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-6/medad.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/medad.mp3'),
(122, 'مَرد', 'man', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-6/mard.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/mard.mp3'),
(123, 'دامَن', 'skirt', NULL, 'اسم، لباس', 'https://ionianfarsi.onrender.com/images/lesson-6/daman.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/daman.mp3'),
(124, 'آسِمان', 'sky', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-6/aseman.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/aseman.mp3'),
(125, 'تیم', 'team', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-6/tim.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/tim.mp3'),
(126, 'نامه', 'letter', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-6/name.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/name.mp3'),
(127, 'بیمار', 'patient', NULL, 'اسم، صفت', 'https://ionianfarsi.onrender.com/images/lesson-6/bimar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/bimar.mp3'),
(129, 'کِتاب', 'book', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-7/ketab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/ketab.mp3'),
(130, 'کُمُد', 'closet', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-7/komod.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/komod.mp3'),
(131, 'دُکمه', 'button', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-7/dokme.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/dokme.mp3'),
(132, 'شِکَر', 'sugar', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-7/shekar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/shekar.mp3'),
(133, 'نَمَک', 'salt', NULL, 'اسم، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-7/namak.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/namak.mp3'),
(134, 'تاکسی', 'taxi', NULL, 'اسم، حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-7/taksi.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/taksi.mp3'),
(135, 'دَستکِش', 'gloves', NULL, 'اسم،‌ لباس', 'https://ionianfarsi.onrender.com/images/lesson-7/dastkesh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/dastkesh.mp3'),
(136, 'پارک', 'park', NULL, 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-7/park.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/park.mp3'),
(137, 'گوش', 'ear', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-7/gush.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/gush.mp3'),
(138, 'گُربه', 'cat', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-7/gorbe.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/gorbe.mp3'),
(139, 'کیلوگِرَم', 'kilogram', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-7/kilugeram.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/kilugeram.mp3'),
(140, 'مَگَس', 'fly', NULL, 'اسم، حشره', 'https://ionianfarsi.onrender.com/images/lesson-7/magas.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/magas.mp3'),
(141, 'سَگ', 'dog', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-7/sag.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/sag.mp3'),
(142, 'کارگَر', 'worker', NULL, 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-7/kargar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/kargar.mp3'),
(143, 'اَنگُشت', 'finger', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-7/angosht.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/angosht.mp3'),
(144, 'گُرگ', 'wolf', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-7/gorg.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/gorg.mp3'),
(145, 'لَب', 'lip', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-8/lab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/lab.mp3'),
(146, 'لیوان', 'mug', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/livan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/livan.mp3'),
(147, 'آلمان', 'Germany', NULL, 'اسم، کشور', 'https://ionianfarsi.onrender.com/images/lesson-8/alman.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/alman.mp3'),
(148, 'پُلیس', 'police', NULL, 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-8/polis.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/polis.mp3'),
(149, 'پُل', 'bridge', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/pol.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/pol.mp3'),
(150, 'سالاد', 'salad', NULL, 'اسم، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-8/salad.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/salad.mp3'),
(151, 'گُلدان', 'vase', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/goldan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/goldan.mp3'),
(152, 'پول', 'money', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/pul.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/pul.mp3'),
(153, 'وان', 'bathtub', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/van.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/van.mp3'),
(154, 'والیبال', 'volleyball', NULL, 'اسم، ورزش', 'https://ionianfarsi.onrender.com/images/lesson-8/valibal.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/valibal.mp3'),
(155, 'داوَر', 'referee', NULL, 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-8/davar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/davar.mp3'),
(156, 'مِسواک', 'toothbrush', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/mesvak.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/mesvak.mp3'),
(157, 'نِگاتیو', 'negative', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/negativ.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/negativ.mp3'),
(158, 'پَروانه', 'butterfly', NULL, 'اسم، حشره', 'https://ionianfarsi.onrender.com/images/lesson-8/parvane.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/parvane.mp3'),
(159, 'میوه', 'fruit', NULL, 'اسم، میوه', 'https://ionianfarsi.onrender.com/images/lesson-8/mive.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/mive.mp3'),
(160, 'ناو', 'cruiser', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/nav.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/nav.mp3'),
(161, 'خودکار', 'pen', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/khodkar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/khodkar.mp3'),
(162, 'نوزاد', 'baby', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/nozad.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/nozad.mp3'),
(163, 'اُتوبوس', 'bus', NULL, 'اسم،‌ حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-8/otobus.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/otobus.mp3'),
(164, 'موبایل', 'mobile', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/mobayl.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/mobayl.mp3'),
(165, 'خورشید', 'sun', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/khorshid.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/khorshid.mp3'),
(166, 'خوشحال', 'happy', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/khoshhal.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/khoshhal.mp3'),
(167, 'آسانسور', 'elevator', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/asansor.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/asansor.mp3'),
(168, 'موتور', 'motorcycle', NULL, 'اسم، حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-8/motor.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/motor.mp3'),
(169, 'حُباب', 'bubble', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/hobab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/hobab.mp3'),
(170, 'حوله', 'towel', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/hole.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/hole.mp3'),
(171, 'ساحِل', 'beach', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/sahel.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/sahel.mp3'),
(172, 'صَحرا', 'desert', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/sahra.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/sahra.mp3'),
(173, 'صُبح', 'morning', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/sobh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/sobh.mp3'),
(174, 'ماشن حِساب', 'calculator', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/mashinhesab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/mashinhesab.mp3'),
(175, 'بَحرِین', 'Bahrain', NULL, 'اسم، کشور', 'https://ionianfarsi.onrender.com/images/lesson-9/bahreyn.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/bahreyn.mp3'),
(176, 'تِمساح', 'alligator', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-9/temsah.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/temsah.mp3'),
(177, 'جَنگَل', 'forest', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/jangal.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/jangal.mp3'),
(178, 'جامِدادی', 'pencil case', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/jamedadi.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/jamedadi.mp3'),
(179, 'گوجه فَرَنگی', 'tomato', NULL, 'اسم، گیاه', 'https://ionianfarsi.onrender.com/images/lesson-9/gojefarangi.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/gojefarangi.mp3'),
(180, 'مَسجِد', 'mosque', NULL, 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-9/masjed.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/masjed.mp3'),
(181, 'گَنج', 'treasure', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/ganj.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/ganj.mp3'),
(182, 'جوجه', 'chicken', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-9/juje.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/juje.mp3'),
(183, 'پَنجَره', 'window', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/panjare.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/panjare.mp3'),
(184, 'تاج', 'crown', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/taj.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/taj.mp3'),
(185, 'خِرس', 'bear', NULL, 'اسم،‌ حیوان', 'https://ionianfarsi.onrender.com/images/lesson-10/khers.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/khers.mp3'),
(186, 'خانه', 'house', NULL, 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-10/khane.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/khane.mp3'),
(187, 'کِتاب خانه', 'library', NULL, 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-10/ketabkhane.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/ketabkhane.mp3'),
(188, 'تَخت', 'bed', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/takht.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/takht.mp3'),
(189, 'نَخ', 'thread', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/nakh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/nakh.mp3'),
(190, 'دِرَخت', 'tree', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/derakht.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/derakht.mp3'),
(191, 'تَخته سیاه', 'blackboard', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/takhtesiah.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/takhtesiah.mp3'),
(192, 'کاخ', 'castle', NULL, 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-10/kakh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/kakh.mp3'),
(193, 'چَتر', 'umbrella', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/chatr.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/chatr.mp3'),
(194, 'چِشم', 'eye', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-10/cheshm.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/cheshm.mp3'),
(195, 'پَرچَم', 'flag', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/parcham.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/parcham.mp3'),
(196, 'باغچه', 'garden', NULL, 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-10/baghche.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/baghche.mp3'),
(197, 'ساندِویچ', 'sandwich', NULL, 'اسم،‌ غذا، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-10/sandevich.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/sandevich.mp3'),
(198, 'پارچه', 'cloth', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/parche.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/parche.mp3'),
(199, 'پُستچی', 'postman', NULL, 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-10/postchi.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/postchi.mp3'),
(200, 'پارچ', 'pitcher', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/parch.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/parch.mp3'),
(201, 'خواب', 'sleep', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/khab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/khab.mp3'),
(202, 'خواهَر', 'sister', NULL, 'اسم، اعضای خوانواده', 'https://ionianfarsi.onrender.com/images/lesson-10/khahar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/khahar.mp3'),
(203, 'خوانَنده', 'singer', NULL, 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-10/khanande.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/khanande.mp3'),
(204, 'کارت خوان', 'POS', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/kartkhan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/kartkhan.mp3'),
(205, 'تَختِ خواب', 'bed', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/takhtekhab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/takhtekhab.mp3'),
(206, 'خواندَن', 'to read', NULL, 'اسم، فعل', 'https://ionianfarsi.onrender.com/images/lesson-10/khandan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/khandan.mp3'),
(207, 'چِراغ خواب', 'night light', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/cheraghkhab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/cheraghkhab.mp3'),
(208, 'اُستُخوان', 'bone', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-10/ostokhan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/ostokhan.mp3'),
(209, 'فَرش', 'carpet', NULL, 'اسم، وسایل خانه', 'https://ionianfarsi.onrender.com/images/lesson-11/farsh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/farsh.mp3'),
(210, 'فوتبال', 'football', NULL, 'اسم، ورزش', 'https://ionianfarsi.onrender.com/images/lesson-11/futbal.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/futbal.mp3'),
(211, 'دَفتَر', 'notebook', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/daftar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/daftar.mp3'),
(212, 'کَفش', 'shoes', NULL, 'اسم، لباس', 'https://ionianfarsi.onrender.com/images/lesson-11/kafsh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/kafsh.mp3'),
(213, 'کیف', 'bag', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/kif.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/kif.mp3'),
(214, 'دَفتَرچه', 'notebook', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/daftarche.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/daftarche.mp3'),
(215, 'تِلِفُن', 'phone', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/telefon.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/telefon.mp3'),
(216, 'بَرف', 'snow', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/barf.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/barf.mp3'),
(217, 'قَند', 'sugar cube', NULL, 'اسم، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-11/ghand.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/ghand.mp3'),
(218, 'قِرمِز', 'red', NULL, 'اسم، رنگ، صفت', 'https://ionianfarsi.onrender.com/images/lesson-11/ghermez.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/ghermez.mp3'),
(219, 'چاقو', 'knife', NULL, 'اسم، وسایل آشپزخانه', 'https://ionianfarsi.onrender.com/images/lesson-11/chaghu.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/chaghu.mp3'),
(220, 'آفریقا', 'Africa', NULL, 'اسم، قاره', 'https://ionianfarsi.onrender.com/images/lesson-11/afrigha.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/afrigha.mp3'),
(221, 'قایِق', 'boat', NULL, 'اسم، حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-11/ghayegh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/ghayegh.mp3'),
(222, 'پُرتِقال', 'orange', NULL, 'اسم، میوه، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-11/porteghal.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/porteghal.mp3'),
(223, 'بُشقاب', 'plate', NULL, 'اسم، وسایل آشپزخانه', 'https://ionianfarsi.onrender.com/images/lesson-11/boshghab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/boshghab.mp3'),
(224, 'فَندُق', 'hazelnut', NULL, 'اسم، خوردنی، آجیل', 'https://ionianfarsi.onrender.com/images/lesson-11/fandogh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/fandogh.mp3'),
(225, 'بَچّه', 'child', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/bache.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/bache.mp3'),
(226, 'نَقّاش', 'painter', NULL, 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-11/naghash.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/naghash.mp3'),
(227, 'پِلّه', 'step', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/pele.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/pele.mp3'),
(228, 'اَرّه', 'saw', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/are.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/are.mp3'),
(229, 'لَکّه', 'stain', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/lake.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/lake.mp3'),
(230, 'بَرّه', 'lamb', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-11/bare.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/bare.mp3'),
(231, 'تَپّه', 'hill', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/tape.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/tape.mp3'),
(232, 'کَفّاش', 'shoemaker', NULL, 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-11/kafash.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/kafash.mp3'),
(233, 'هُلو', 'peach', NULL, 'اسم، میوه، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-12/peach.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/peach.mp3'),
(234, 'هِند', 'India', NULL, 'اسم، کشور در آسیا', 'https://ionianfarsi.onrender.com/images/lesson-12/India.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/India.mp3'),
(235, 'آهو', 'deer done', NULL, 'اسم، حیوان اهلی', 'https://ionianfarsi.onrender.com/images/lesson-12/deer-doe.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/deer-doe.mp3'),
(236, 'شَهر', 'city', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/city.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/city.mp3'),
(237, 'مِه', 'fog', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/fog.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/fog.mp3'),
(238, 'ماهی', 'fish', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-12/fish.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/fish.mp3'),
(239, 'بَهار', 'spring', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/spring.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/spring.mp3'),
(240, 'ماه', 'moon', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/moon.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/moon.mp3'),
(241, 'یَخ', 'ice', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/ice.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/ice.mp3'),
(242, 'یَقه', 'collar', NULL, 'اسم، لباس', 'https://ionianfarsi.onrender.com/images/lesson-12/collar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/collar.mp3'),
(243, 'دَریا', 'sea', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/sea.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/sea.mp3'),
(244, 'قِیچی', 'scissor', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/scissor.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/scissor.mp3'),
(245, 'نِی', 'straw', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/straw.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/straw.mp3'),
(246, 'آینه', 'mirror', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/mirror.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/mirror.mp3'),
(247, 'هَواپِیما', 'airplane', NULL, 'اسم، حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-12/airplane.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/airplane.mp3'),
(248, 'چای', 'tea', NULL, 'اسم، نوشیدنی', 'https://ionianfarsi.onrender.com/images/lesson-12/tea.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/tea.mp3'),
(249, 'پیاز', 'onion', NULL, 'اسم، گیاه', 'https://ionianfarsi.onrender.com/images/lesson-12/onion.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/onion.mp3'),
(250, 'سیاه', 'black', NULL, 'اسم، رنگ، صفت', 'https://ionianfarsi.onrender.com/images/lesson-12/black.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/black.mp3'),
(251, 'خیار', 'cucumber', NULL, 'اسم، گیاه', 'https://ionianfarsi.onrender.com/images/lesson-12/cucumber.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/cucumber.mp3'),
(252, 'خیابان', 'street', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/street.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/street.mp3'),
(253, 'بیابان', 'desert', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/desert.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/desert.mp3'),
(254, 'آسیا', 'Asia', NULL, 'اسم، قاره', 'https://ionianfarsi.onrender.com/images/lesson-12/Asia.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/Asia.mp3'),
(255, 'ایتالیا', 'Italy', NULL, 'اسم، کشور در اروپا', 'https://ionianfarsi.onrender.com/images/lesson-12/Italy.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/Italy.mp3'),
(256, 'پیاده رو', 'sidewalk', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/sidewalk.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/sidewalk.mp3'),
(257, 'صابون', 'soap', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-13/soap.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/soap.mp3'),
(258, 'صورَت', 'face', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-13/face.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/face.mp3'),
(259, 'اِصفِهان', 'Isfahan', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-13/Isfahan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/Isfahan.mp3'),
(260, 'عَصا', 'walking stick', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-13/walking-stick.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/walking-stick.mp3'),
(261, 'رَصَدخانه', 'observatory', NULL, 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-13/observatory.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/observatory.mp3'),
(262, 'قَصّاب', 'butcher', NULL, 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-13/butcher.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/butcher.mp3'),
(263, 'قُرص', 'tablet', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-13/tablet.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/tablet.mp3'),
(264, 'ضَعیف', 'weak', NULL, 'صفت', 'https://ionianfarsi.onrender.com/images/lesson-13/weak.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/weak.mp3'),
(265, 'ظَبطِ صوت', 'tape recorder', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-13/tape-recorder.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/tape-recorder.mp3'),
(266, 'فَضا', 'space', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-13/space.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/space.mp3'),
(267, 'مَریض', 'ill', NULL, 'صفت', 'https://ionianfarsi.onrender.com/images/lesson-13/ill.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/ill.mp3'),
(268, 'ریاضی', 'mathematics', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-13/mathematics.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/mathematics.mp3'),
(269, 'فَضانَوَرد', 'astronaut', NULL, 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-13/astronaut.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/astronaut.mp3'),
(270, 'حوض', 'pond', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-13/pond.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/pond.mp3'),
(271, 'عِینَک', 'glasses', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/glasses.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/glasses.mp3'),
(272, 'عَسَل', 'honey', NULL, 'اسم، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-14/honey.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/honey.mp3'),
(273, 'ساعَت', 'watch', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/watch.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/watch.mp3'),
(274, 'جَعبه', 'box', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/box.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/box.mp3'),
(275, 'شَمع', 'candle', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/candle.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/candle.mp3'),
(276, 'رَعدوبَرق', 'thunder-light', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/thunder-light.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/thunder-light.mp3'),
(277, 'مُعَلّم', 'teacher', NULL, 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-14/teacher.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/teacher.mp3'),
(278, 'شُروع', 'start', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/start.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/start.mp3'),
(279, 'غَذا', 'food', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/food.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/food.mp3'),
(280, 'غُروب', 'sunset', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/sunset.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/sunset.mp3'),
(281, 'کاغَذ', 'paper', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/paper.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/paper.mp3'),
(282, 'مَغز', 'brain', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-14/brain.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/brain.mp3'),
(283, 'تیغ', 'blade', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/blade.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/blade.mp3'),
(284, 'قورباغه', 'frog', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-14/frog.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/frog.mp3'),
(285, 'مَغازه', 'shop', NULL, 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-14/shop.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/shop.mp3'),
(286, 'مُرغ', 'hen', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-14/hen.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/hen.mp3'),
(287, 'طَلا', 'gold', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-15/gold.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/gold.mp3'),
(288, 'طَناب', 'rope', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-15/rope.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/rope.mp3'),
(289, 'قوطی', 'can', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-15/can.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/can.mp3'),
(290, 'سَطل', 'bucket', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-15/bucket.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/bucket.mp3'),
(291, 'خَط', 'line', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-15/line.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/line.mp3'),
(292, 'طوطی', 'parrot', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-15/parrot.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/parrot.mp3'),
(293, 'قَطار', 'train', NULL, 'اسم، حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-15/train.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/train.mp3'),
(294, 'حَیاط', 'yard', NULL, 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-15/yard.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/yard.mp3'),
(295, 'ظَرف', 'container', NULL, 'اسم، وسایل آشپزخانه', 'https://ionianfarsi.onrender.com/images/lesson-15/container.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/container.mp3'),
(296, 'ظُهر', 'noon', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-15/noon.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/noon.mp3'),
(297, 'نِظافَت چی', 'cleaner', NULL, 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-15/cleaner.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/cleaner.mp3'),
(298, 'مُحافِظ', 'budyguard', NULL, 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-15/bodyguard.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/bodyguard.mp3'),
(299, 'ماشینِ ظَرفشویی', 'dishwasher', NULL, 'اسم، وسایل آشپزخانه', 'https://ionianfarsi.onrender.com/images/lesson-15/dishwasher.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/dishwasher.mp3'),
(300, 'خُداحافِظ', 'goodbye', NULL, 'شبه جمله', 'https://ionianfarsi.onrender.com/images/lesson-15/goodbye.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/goodbye.mp3'),
(301, 'ژِله', 'jelly', NULL, 'اسم، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-16/jelly.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/jelly.mp3'),
(302, 'ژاکَت', 'jacket', NULL, 'اسم، لباس', 'https://ionianfarsi.onrender.com/images/lesson-16/jacket.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/jacket.mp3'),
(303, 'ماژیک', 'marker', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-16/marker.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/marker.mp3');
INSERT INTO `words` (`id`, `written_form`, `english_equivalent`, `transliteration`, `category`, `image_url`, `audio_url`) VALUES
(304, 'بِلژیک', '‌Belgium', NULL, 'اسم، کشور در اروپا', 'https://ionianfarsi.onrender.com/images/lesson-16/Belgium.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/Belgium.mp3'),
(305, 'بِژ', 'beige', NULL, 'اسم، رنگ', 'https://ionianfarsi.onrender.com/images/lesson-16/beige.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/beige.mp3'),
(306, 'اِژدِها', 'dragon', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-16/dragon.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/dragon.mp3'),
(307, 'مُژه', 'eyelash', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-16/eyelash.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/eyelash.mp3'),
(308, 'دِژ', 'stronghold', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-16/stronghold.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/stronghold.mp3'),
(309, 'ذُرَّت', 'corn', NULL, 'اسم، خوردنی، گیاه', 'https://ionianfarsi.onrender.com/images/lesson-16/corn.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/corn.mp3'),
(310, 'ذَرّه بین', 'magnifier', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-16/magnifier.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/magnifier.mp3'),
(311, 'آذَربایجان', 'Azerbaijan', NULL, 'اسم، کشور در آسیا', 'https://ionianfarsi.onrender.com/images/lesson-16/Azerbaijan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/Azerbaijan.mp3'),
(312, 'غَذا', 'food', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-16/food.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/food.mp3'),
(313, 'آذَر', 'persian month', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-16/persian-month.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/persian-month.mp3'),
(314, 'گُذَرنامه', 'passport', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-16/passport.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/passport.mp3'),
(315, 'کاغَذ', 'paper', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-16/paper.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/paper.mp3'),
(316, 'ثانیه', 'second', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-17/second.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/second.mp3'),
(317, 'ثِروَتمَند', 'wealthy', NULL, 'صفت', 'https://ionianfarsi.onrender.com/images/lesson-17/wealthy.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/wealthy.mp3'),
(318, 'لَثه', 'gum', NULL, 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-17/gum.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/gum.mp3'),
(319, 'مُثَلَّث', 'triangle', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-17/triangle.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/triangle.mp3'),
(320, 'کَثیف', 'dirty', NULL, 'صفت', 'https://ionianfarsi.onrender.com/images/lesson-17/dirty.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/dirty.mp3'),
(321, 'اَثاث', 'furniture', NULL, 'اسم، وسایل خانه', 'https://ionianfarsi.onrender.com/images/lesson-17/furniture.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/furniture.mp3'),
(322, 'پَنگوئَن', 'panguin', NULL, 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-17/penguin.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/penguin.mp3'),
(323, 'رَئیس', 'head', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-17/head.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/head.mp3'),
(324, 'مُتَأَهّل', 'married', NULL, 'صفت', 'https://ionianfarsi.onrender.com/images/lesson-17/married.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/married.mp3'),
(325, 'سُؤال', 'question', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-17/question.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/question.mp3'),
(326, 'رَأی', 'vote', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-17/vote.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/vote.mp3'),
(327, 'مُؤَسّسه', 'institute', NULL, 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-17/institute.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/institute.mp3'),
(328, 'یونان', 'Greece', NULL, 'کشور', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/1280px-Flag_of_Greece.svg.png', 'https://ionianfarsi.onrender.com/audio/section-1/Greece.mp3'),
(329, 'تُرکیه', 'Turkiye', NULL, 'کشور', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1280px-Flag_of_Turkey.svg.png', 'https://ionianfarsi.onrender.com/audio/section-1/Turkiye.mp3'),
(330, 'سودان', 'Sudan', NULL, 'کشور در آفریقا', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Sudan.svg/1920px-Flag_of_Sudan.svg.png', 'https://ionianfarsi.onrender.com/audio/section-1/Sudan.mp3'),
(331, 'لُبنان', 'Lebanon', NULL, 'کشور', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Flag_of_Lebanon.svg/1280px-Flag_of_Lebanon.svg.png', 'https://ionianfarsi.onrender.com/audio/section-1/Lebanon.mp3'),
(332, 'کُره', 'Korea', NULL, 'کشور در آسیا', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Unification_flag_of_Korea.svg/1280px-Unification_flag_of_Korea.svg.png', 'https://ionianfarsi.onrender.com/audio/section-1/Korea.mp3'),
(333, 'چین', 'China', 'chin', 'کشور در آسیا', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1280px-Flag_of_the_People%27s_Republic_of_China.svg.png', 'https://ionianfarsi.onrender.com/audio/section-1/China.mp3'),
(335, 'اَست', 'is', NULL, 'صرف سوم شخص مفرد فعل بودن', NULL, 'https://ionianfarsi.onrender.com/audio/section-1/is.mp3'),
(336, 'هَستَم', 'am', NULL, 'صرف اول شخص مفرد فعل بودن', NULL, 'https://ionianfarsi.onrender.com/audio/section-1/am.mp3'),
(337, 'هَستی', 'are', NULL, 'صرف دوم شخص مفرد فعل بودن', NULL, 'https://ionianfarsi.onrender.com/audio/section-1/are.mp3'),
(338, 'علی', 'Ali', NULL, 'اسم فرد', NULL, 'https://ionianfarsi.onrender.com/audio/section-1/unit-1/words/Ali.mp3'),
(339, 'به', 'to', NULL, NULL, NULL, 'https://ionianfarsi.onrender.com/audio/section-1/unit-1/words/to.mp3'),
(340, 'مَدرِسه', 'school', NULL, 'مکان', NULL, 'https://ionianfarsi.onrender.com/audio/section-1/unit-1/words/school.mp3'),
(341, 'می‌رَوَد', 'goes', NULL, 'سوم شخص مفرد فعل رفتن', NULL, 'https://ionianfarsi.onrender.com/audio/section-1/unit-1/words/goes.mp3'),
(342, 'سَلام', 'Hello', NULL, NULL, NULL, 'https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/Hello.mp3'),
(343, 'اِسم', 'name', NULL, 'ضمایر شخصی', NULL, 'https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/name.mp3'),
(344, 'مَن', 'i', NULL, 'ضمایر شخصی', NULL, 'https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/i.mp3'),
(345, 'تو', 'you', NULL, 'ضمایر شخصی', NULL, 'https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/you.mp3'),
(346, 'چیست', 'what is', NULL, NULL, NULL, 'https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/what-is.mp3'),
(347, 'سیما', 'Sima', NULL, 'اسم فرد', NULL, 'https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/Sima.mp3'),
(348, 'پِدرام', 'Pedram', NULL, 'اسم فرد', NULL, 'https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/Pedram.mp3'),
(349, 'مَریَم', 'Mary', NULL, 'اسم فرد', NULL, NULL),
(350, 'کُجا', 'where', NULL, NULL, NULL, 'https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/where.mp3'),
(351, 'آ', 'aa', 'aa', 'letter', 'https://ionianfarsi.onrender.com/images/section-1/unit-1/words/aa.png', 'https://ionianfarsi.onrender.com/audio/letters/aa.mp3'),
(352, 'ا', 'aa', 'aa', 'letter', 'https://ionianfarsi.onrender.com/images/section-1/unit-1/words/aa.png', 'https://ionianfarsi.onrender.com/audio/letters/aa.mp3'),
(353, 'بـ', 'b', 'b', 'letter', 'https://ionianfarsi.onrender.com/images/section-1/unit-1/words/b.png', 'https://ionianfarsi.onrender.com/audio/letters/b.mp3'),
(354, 'ب', 'b', 'b', 'letter', 'https://ionianfarsi.onrender.com/images/section-1/unit-1/words/b.png', 'https://ionianfarsi.onrender.com/audio/letters/b.mp3'),
(355, 'باب', 'Bob', 'baab', 'name', NULL, NULL),
(356, 'آتَش', 'fire', 'aatash', NULL, NULL, NULL),
(357, 'اَ', 'a', 'a', 'letter', 'https://ionianfarsi.onrender.com/images/section-1/unit-1/words/a.png', 'https://ionianfarsi.onrender.com/audio/letters/a.mp3'),
(358, 'اسم', 'name', 'Esm', NULL, NULL, 'https://ionianfarsi.onrender.com/audio/section-1/hello.mp3'),
(359, 'تو', 'your', 'to', NULL, NULL, NULL),
(360, 'چیست؟', 'what is', 'Chist', NULL, NULL, NULL),
(361, 'سلام', 'Hello', NULL, NULL, NULL, 'https://ionianfarsi.onrender.com/audio/section-1/hello.mp3');

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
-- Dumping data for table `words_in_sentence`
--

INSERT INTO `words_in_sentence` (`word_id`, `sentence_id`, `position`) VALUES
(358, 12, 1),
(359, 12, 2),
(360, 12, 3),
(361, 1, 1);

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
  ADD PRIMARY KEY (`word_id`,`sentence_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `challenges`
--
ALTER TABLE `challenges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=508;

--
-- AUTO_INCREMENT for table `challenge_match`
--
ALTER TABLE `challenge_match`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `challenge_select`
--
ALTER TABLE `challenge_select`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `challenge_select_options`
--
ALTER TABLE `challenge_select_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `challenge_sort`
--
ALTER TABLE `challenge_sort`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `characters`
--
ALTER TABLE `characters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dialogues`
--
ALTER TABLE `dialogues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `dialogue_lines`
--
ALTER TABLE `dialogue_lines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `letters`
--
ALTER TABLE `letters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `repetitions`
--
ALTER TABLE `repetitions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sentences`
--
ALTER TABLE `sentences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `words`
--
ALTER TABLE `words`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=362;

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