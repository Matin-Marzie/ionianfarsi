-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql7.freesqldatabase.com
-- Generation Time: Jul 30, 2025 at 02:12 PM
-- Server version: 5.5.62-0ubuntu0.14.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
-- Table structure for table `challenge`
--

CREATE TABLE `challenge` (
  `id` int(11) NOT NULL,
  `type` enum('challenge_match','challenge_listen_and_repeat','challenge_select','challenge_sort') COLLATE utf8_persian_ci NOT NULL,
  `challenge_order` int(2) NOT NULL,
  `question` varchar(255) COLLATE utf8_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `challenges_in_lesson`
--

CREATE TABLE `challenges_in_lesson` (
  `challenge_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `challenge_match`
--

CREATE TABLE `challenge_match` (
  `id` int(11) NOT NULL,
  `type` enum('match_picture_to_written_form','match_sound_to_written_form','match_written_form_to_english_equivalent') COLLATE utf8_persian_ci DEFAULT NULL,
  `challenge_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `challenge_select`
--

CREATE TABLE `challenge_select` (
  `id` int(11) NOT NULL,
  `type` enum('listen_select_written_form','read_word_select_picture','read_sentence_select_written_form','listen_answer_question') COLLATE utf8_persian_ci DEFAULT NULL,
  `question` varchar(250) COLLATE utf8_persian_ci DEFAULT NULL,
  `sentence_id` int(11) DEFAULT NULL,
  `word_id` int(11) DEFAULT NULL,
  `challenge_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `challenge_select_option`
--

CREATE TABLE `challenge_select_option` (
  `id` int(11) NOT NULL,
  `correct` tinyint(1) DEFAULT NULL,
  `word_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `challenge_sort`
--

CREATE TABLE `challenge_sort` (
  `id` int(11) NOT NULL,
  `type` enum('listen_sort_word','read_farsi_sort_english_equivalent_sentence','read_english_equivalent_sort_farsi_sentence','read_farsi_sort_word','listen_sort_sentence') COLLATE utf8_persian_ci DEFAULT NULL,
  `sentence_id` int(11) DEFAULT NULL,
  `word_id` int(11) DEFAULT NULL,
  `challenge_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lesson`
--

CREATE TABLE `lesson` (
  `id` int(11) NOT NULL,
  `title` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `lesson_order` int(2) NOT NULL,
  `repetition_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `letter`
--

CREATE TABLE `letter` (
  `id` int(11) NOT NULL,
  `writing_style` varchar(128) COLLATE utf8_persian_ci NOT NULL,
  `letter_sign` varchar(32) COLLATE utf8_persian_ci DEFAULT NULL,
  `english_example` varchar(16) COLLATE utf8_persian_ci DEFAULT NULL,
  `persian_example` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `type` enum('consonant','vowel') COLLATE utf8_persian_ci NOT NULL,
  `audio_url` varchar(250) COLLATE utf8_persian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `letter`
--

INSERT INTO `letter` (`id`, `writing_style`, `letter_sign`, `english_example`, `persian_example`, `type`, `audio_url`) VALUES
(1, 'ا', NULL, 'on, God', 'بابا، آب', 'vowel', 'https://ionianfarsi.onrender.com/audio/letters/aa.mp3'),
(2, 'ب', NULL, 'book', 'باران', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/b.mp3'),
(3, 'َ', NULL, 'cat', 'دَر', 'vowel', 'https://ionianfarsi.onrender.com/audio/letters/a.mp3'),
(4, 'ی ای', NULL, 'happy', 'دیر، ایران', 'vowel', 'https://ionianfarsi.onrender.com/audio/letters/i.mp3'),
(5, 'پ', NULL, 'pen', 'پا', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/p.mp3'),
(6, 'ت', NULL, 'ten', 'توپ', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/t.mp3'),
(7, 'اُ  ُ', NULL, 'saw', 'اُردَک، پُر', 'vowel', NULL),
(8, 'س', NULL, 'rice, sad', 'سَبز', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/s.mp3'),
(9, 'ش', NULL, 'she', 'شیر', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/sh.mp3'),
(10, 'ِ', NULL, 'get', 'اِستَخر، سه', 'vowel', 'https://ionianfarsi.onrender.com/audio/letters/e.mp3'),
(11, 'ر', NULL, 'red', 'رود', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/r.mp3'),
(12, 'ز', NULL, 'zoo', 'زَنبور', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/z.mp3'),
(13, 'او و', NULL, 'good', 'موش، گِردو', 'vowel', 'https://ionianfarsi.onrender.com/audio/letters/u.mp3'),
(14, 'د', NULL, 'do', 'دود', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/d.mp3'),
(15, 'ن', NULL, 'pen', 'نَمَک', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/n.mp3'),
(16, 'م', NULL, 'milk', 'میز', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/m.mp3'),
(17, 'ک', NULL, 'cat, ask', 'کِتاب', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/k.mp3'),
(18, 'گ', NULL, 'get', 'گُل، سَگ', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/g.mp3'),
(19, 'ل', NULL, 'ball, let', 'لَب،‌ پُل', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/l.mp3'),
(20, 'و', NULL, 'very', 'وان', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/v.mp3'),
(21, 'ُ', NULL, 'saw', '	\r\nاُردَک، پُر', 'vowel', 'https://ionianfarsi.onrender.com/audio/letters/o.mp3'),
(22, 'ح', NULL, 'hit', 'حباب', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/h-jim.mp3'),
(23, 'ج', NULL, 'job, age', 'جَنگَل', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/jim.mp3'),
(24, 'خ', NULL, NULL, 'خِرس', 'consonant', NULL),
(25, 'چ', NULL, 'cheese', 'چِشم', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/ch.mp3'),
(26, 'خوا', NULL, 'khanacademy', 'خواب', 'consonant', NULL),
(27, 'ف', NULL, 'food', 'فَرش، کَفش', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/f.mp3'),
(28, 'ق', NULL, '-', 'قِرمِز، غَذا', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/gh.mp3'),
(29, 'ّ', NULL, NULL, 'بَچّه', 'consonant', NULL),
(30, 'ه', NULL, 'hit', 'هِند،‌ حُباب', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/h.mp3'),
(31, 'ی', NULL, 'yes', 'یَخ', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/y.mp3'),
(32, 'ی+ی', NULL, NULL, 'خیار،‌ سیاه', 'consonant', NULL),
(33, 'ص', NULL, 'rice, sad', 'صابون', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/sad.mp3'),
(34, 'ض', NULL, 'zoo', 'وضو', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/zad.mp3'),
(35, 'ع', NULL, '-', 'عَسَل، ساعَت', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/ayn.mp3'),
(36, 'غ', NULL, '-', 'غَذا', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/ghayn.mp3'),
(37, 'ط', NULL, 'ten', 'طلا', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/t-daste-dar.mp3'),
(38, 'ظ', NULL, 'zoo', 'ظرف', 'consonant', 'https://ionianfarsi.onrender.com/audio/letters/z-daste-dar.mp3'),
(39, 'ژ', NULL, 'television', 'ژله، گاراژ', 'consonant', 'localhost:8081/audio/letters/zh.mp3'),
(40, 'ذ', NULL, 'zoo', 'غَذا', 'consonant', 'localhost:8081/audio/letters/de-ze.mp3'),
(41, 'ث', NULL, 'rice, sad', 'کَثیف', 'consonant', 'localhost:8081/audio/letters/s-senoghte.mp3'),
(42, 'ئ أ ؤ', NULL, '-', 'رَئیس', 'consonant', 'localhost:8081/audio/letters/6.mp3');

-- --------------------------------------------------------

--
-- Table structure for table `options_in_challenge_select`
--

CREATE TABLE `options_in_challenge_select` (
  `challenge_select_id` int(11) NOT NULL,
  `challenge_select_option_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `repetitions`
--

CREATE TABLE `repetitions` (
  `id` int(11) NOT NULL,
  `titile` varchar(50) DEFAULT NULL,
  `repetition_order` int(2) NOT NULL,
  `unit_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `id` int(11) NOT NULL,
  `title` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `image_url` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `level` varchar(2) COLLATE utf8_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`id`, `title`, `description`, `image_url`, `level`) VALUES
(1, 'Play with Letters, Dance with Words!', 'Learn the Alphabet and many words.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Farsi.svg/1280px-Farsi.svg.png', 'N'),
(2, 'سَلام عَلَیکُم', '', 'https://ionianfarsi.onrender.com/images/section-2.webp', 'Α1');

-- --------------------------------------------------------

--
-- Table structure for table `sentence`
--

CREATE TABLE `sentence` (
  `id` int(11) NOT NULL,
  `written_form` varchar(250) COLLATE utf8_persian_ci DEFAULT NULL,
  `written_form2` varchar(250) COLLATE utf8_persian_ci DEFAULT NULL,
  `written_form3` varchar(250) COLLATE utf8_persian_ci DEFAULT NULL,
  `english_equivalent` varchar(250) COLLATE utf8_persian_ci DEFAULT NULL,
  `image_url` varchar(250) COLLATE utf8_persian_ci DEFAULT NULL,
  `audio_url` varchar(250) COLLATE utf8_persian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

CREATE TABLE `unit` (
  `id` int(11) NOT NULL,
  `title` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `description` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `unit_order` int(3) NOT NULL,
  `section_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(35) COLLATE utf8_persian_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `refresh_token` varchar(155) COLLATE utf8_persian_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `experience` int(11) NOT NULL DEFAULT '0',
  `current_section` int(11) NOT NULL DEFAULT '1',
  `current_unit` int(11) NOT NULL DEFAULT '1',
  `current_repetition` int(1) NOT NULL DEFAULT '1',
  `current_lesson` int(11) NOT NULL DEFAULT '1',
  `joined_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `word`
--

CREATE TABLE `word` (
  `id` int(11) NOT NULL,
  `written_form` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `english_equivalent` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf32 COLLATE utf32_persian_ci DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `audio_url` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `word`
--

INSERT INTO `word` (`id`, `written_form`, `english_equivalent`, `category`, `image_url`, `audio_url`) VALUES
(1, 'آب', 'water', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/ab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/ab.mp3'),
(2, 'آبی', 'blue', 'نام رنگ، صفت', 'https://ionianfarsi.onrender.com/images/lesson-1/abi.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/abi.mp3'),
(3, 'بادام', 'almond', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/badam.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/badam.mp3'),
(4, 'پا', 'foot', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-1/pa.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/pa.mp3'),
(5, 'باران', 'rain', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/baran.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/baran.mp3'),
(6, 'باد', 'wind', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/bad.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/bad.mp3'),
(7, 'پاندا', 'panda', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-1/panda.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/panda.mp3'),
(8, 'آسِمان', 'sky', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/aseman.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/aseman.mp3'),
(9, 'اَبر', 'cloud', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/abr.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/abr.mp3'),
(10, 'بَبر', 'tiger', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-1/babr.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/babr.mp3'),
(11, 'مُبل', 'sofa', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/mobl.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/mobl.mp3'),
(12, 'بازار', 'bazaar', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/bazar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/bazar.mp3'),
(13, 'قاب', 'frame', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/ghab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/ghab.mp3'),
(14, 'کَباب', 'kebab', 'اسم، غذا', 'https://ionianfarsi.onrender.com/images/lesson-1/kabab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/kabab.mp3'),
(15, 'سیب', 'apple', 'اسم، میوه', 'https://ionianfarsi.onrender.com/images/lesson-1/sib.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/sib.mp3'),
(16, 'بابا', 'daddy', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/baba.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/baba.mp3'),
(17, 'اَسب', 'horse', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-1/asb.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/asb.mp3'),
(18, 'اَنگُشت', 'finger', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-1/angosht.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/angosht.mp3'),
(19, 'اَبرو', 'eyebrow', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-1/abru.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/abru.mp3'),
(20, 'اَنار', 'pomegranate', 'اسم، میوه', 'https://ionianfarsi.onrender.com/images/lesson-1/anar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/anar.mp3'),
(21, 'بَستَنی', 'ice cream', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/bastani.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/bastani.mp3'),
(22, 'اَنجیر', 'fig', 'اسم، میوه', 'https://ionianfarsi.onrender.com/images/lesson-1/anjir.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/anjir.mp3'),
(23, 'اَنگور', 'grape', 'اسم،‌ میوه', 'https://ionianfarsi.onrender.com/images/lesson-1/angur.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/angur.mp3'),
(24, 'سَبَد', 'basket', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-1/sabad.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-1/sabad.mp3'),
(25, 'ایران', 'Iran', 'اسم، کشور', 'https://ionianfarsi.onrender.com/images/lesson-2/iran.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/iran.mp3'),
(26, 'ایتالیا', 'Italy', 'اسم، کشور', 'https://ionianfarsi.onrender.com/images/lesson-2/italia.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/italia.mp3'),
(27, 'شیر', 'Iran', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-2/shir.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/shir.mp3'),
(28, 'توسی', 'gray', 'اسم، رنگ', 'https://ionianfarsi.onrender.com/images/lesson-2/tusi.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/tusi.mp3'),
(29, 'قَهوه ای', 'brown', 'اسم، رنگ', 'https://ionianfarsi.onrender.com/images/lesson-2/ghahvei.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/ghahvei.mp3'),
(30, 'لیوان', 'mug', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/livan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/livan.mp3'),
(31, 'روسَری', 'scarf', 'اسم، لباس', 'https://ionianfarsi.onrender.com/images/lesson-2/rusari.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/rusari.mp3'),
(32, 'سُرمه ای', 'navy blue', 'اسم، رنگ', 'https://ionianfarsi.onrender.com/images/lesson-2/sormei.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/sormei.mp3'),
(33, 'پَر', 'feather', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/par.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/par.mp3'),
(34, 'پاپ', 'Pope', 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-2/pap.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/pap.mp3'),
(35, 'ژاپُن', 'Japan', 'اسم، کشور', 'https://ionianfarsi.onrender.com/images/lesson-2/zhapon.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/zhapon.mp3'),
(36, 'آشپَز', 'cook', 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-2/ashpaz.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/ashpaz.mp3'),
(37, 'زیپ', 'zipper', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/zip.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/zip.mp3'),
(38, 'هَواپِیما', 'airplane', 'اسم، حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-2/havapeyma.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/havapeyma.mp3'),
(39, 'شامپو', 'shampoo', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/shampu.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/shampu.mp3'),
(40, 'سوپ', 'soup', 'اسم، غذا', 'https://ionianfarsi.onrender.com/images/lesson-2/sup.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/sup.mp3'),
(41, 'تاب', 'swing', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/tab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/tab.mp3'),
(42, 'توپ', 'ball', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/tup.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/tup.mp3'),
(43, 'آتَش', 'fire', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/atash.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/atash.mp3'),
(44, 'دُختَر', 'girl', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/dokhtar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/dokhtar.mp3'),
(45, 'دَست', 'hand', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-2/dast.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/dast.mp3'),
(46, 'اُتاق', 'room', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/otagh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/otagh.mp3'),
(47, 'کِتری', 'kettle', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/ketri.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/ketri.mp3'),
(48, 'سوت', 'whistle', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-2/sut.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-2/sut.mp3'),
(49, 'اُردَک', 'duck', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-3/ordak.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/ordak.mp3'),
(50, 'اُتاق', 'room', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/otagh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/otagh.mp3'),
(51, 'گُل', 'flower', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/gol.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/gol.mp3'),
(52, 'اُتو', 'iron', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/utu.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/utu.mp3'),
(53, 'رُز', 'rose', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/roz.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/roz.mp3'),
(54, 'بُز', 'goat', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-3/boz.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/boz.mp3'),
(55, 'اُروپا', 'Europe', 'اسم، قاره', 'https://ionianfarsi.onrender.com/images/lesson-3/urupa.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/urupa.mp3'),
(56, 'شُتُر', 'camel', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-3/shotor.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/shotor.mp3'),
(57, 'سَر', 'head', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-3/sar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/sar.mp3'),
(58, 'سَبز', 'green', 'اسم، رنگ', 'https://ionianfarsi.onrender.com/images/lesson-3/sabz.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/sabz.mp3'),
(59, 'دَستمال', 'tissue', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/dastmal.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/dastmal.mp3'),
(60, 'مِسواک', 'toothbrush', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/mesvak.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/mesvak.mp3'),
(61, 'پُلیس', 'police', 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-3/polis.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/polis.mp3'),
(62, 'سُرسُره', 'slide', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/sorsore.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/sorsore.mp3'),
(63, 'پِسَر', 'boy', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/pesar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/pesar.mp3'),
(64, 'کِلاس', 'class', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/kelas.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/kelas.mp3'),
(65, 'شَب', 'night', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/shab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/shab.mp3'),
(66, 'شیر', 'milk', 'اسم، نوشیدنی', 'https://ionianfarsi.onrender.com/images/lesson-3/shir.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/shir.mp3'),
(67, 'ماشین', 'car', 'اسم، حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-3/mashin.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/mashin.mp3'),
(68, 'کِشتی', 'ship', 'اسم، حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-3/keshti.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/keshti.mp3'),
(69, 'ریش', 'beard', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-3/rish.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/rish.mp3'),
(70, 'قاشُق', 'spoon', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/ghashogh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/ghashogh.mp3'),
(71, 'نَقشه', 'map', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/naghshe.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/naghshe.mp3'),
(72, 'تَراش', 'sharpener', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-3/tarash.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-3/tarash.mp3'),
(73, 'اِستَخر', 'swimming pool', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/estakhr.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/estakhr.mp3'),
(74, 'اِستِکان', 'glass', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/estekan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/estekan.mp3'),
(75, 'مِداد', 'pencil', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/medad.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/medad.mp3'),
(76, 'بَسته', 'pack', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/baste.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/baste.mp3'),
(77, 'پَرَنده', 'bird', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-4/parande.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/parande.mp3'),
(78, 'پِسته', 'pistachio', 'اسم، آجیل', 'https://ionianfarsi.onrender.com/images/lesson-4/peste.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/peste.mp3'),
(79, 'روزنامه', 'newspaper', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/ruzname.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/ruzname.mp3'),
(80, 'پَرده', 'curtain', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/parde.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/parde.mp3'),
(81, 'روستا', 'village', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/rusta.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/rusta.mp3'),
(82, 'رود', 'river', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/rud.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/rud.mp3'),
(83, 'پارو', 'oar', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/paru.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/paru.mp3'),
(84, 'مَرد', 'man', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/mard.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/mard.mp3'),
(85, 'سیر', 'garlic', 'اسم، گیاه', 'https://ionianfarsi.onrender.com/images/lesson-4/sir.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/sir.mp3'),
(86, 'جارو', 'sweep', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/jaru.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/jaru.mp3'),
(87, 'مُرغ', 'hen', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-4/morgh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/morgh.mp3'),
(88, 'زَنبور', 'bee', 'اسم، حشره', 'https://ionianfarsi.onrender.com/images/lesson-4/zanbur.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/zanbur.mp3'),
(89, 'زَبان', 'tongue', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-4/zaban.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/zaban.mp3'),
(90, 'زَن', 'woman', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/zan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/zan.mp3'),
(91, 'وَرزِش', 'sport', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/varzesh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/varzesh.mp3'),
(92, 'مَزرَعه', 'farm', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/mazrae.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/mazrae.mp3'),
(93, 'میز', 'table', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/miz.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/miz.mp3'),
(94, 'بازو', 'arm', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-4/bazu.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/bazu.mp3'),
(95, 'پِزِشک', 'doctor of medicine', 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-4/pezeshk.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/pezeshk.mp3'),
(96, 'روز', 'day', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-4/ruz.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-4/ruz.mp3'),
(97, 'او', 'he or she', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-5/u.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/u.mp3'),
(98, 'اوکراین', 'Ukraine', 'اسم، کشور', 'https://ionianfarsi.onrender.com/images/lesson-5/ukrain.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/ukrain.mp3'),
(99, 'دود', 'smoke', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-5/dud.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/dud.mp3'),
(100, 'کَبوتَر', 'pigeon', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-5/kabutar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/kabutar.mp3'),
(101, 'مو', 'hair', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-5/mu.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/mu.mp3'),
(102, 'رود', 'river', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-5/rud.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/rud.mp3'),
(103, 'تور', 'net', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-5/tur.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/tur.mp3'),
(104, 'گِردو', 'walnut', 'اسم، آجیل، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-5/gerdu.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/gerdu.mp3'),
(105, 'دَر', 'door', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-5/dar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/dar.mp3'),
(106, 'دَست', 'hand', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-5/dast.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/dast.mp3'),
(107, 'مادَر', 'mother', 'اسم، اعضای خانواده', 'https://ionianfarsi.onrender.com/images/lesson-5/madar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/madar.mp3'),
(108, 'پِدَر', 'father', 'اسم، اعضای خوانواده', 'https://ionianfarsi.onrender.com/images/lesson-5/pedar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/pedar.mp3'),
(109, 'سِفید', 'white', 'اسم، رنگ', 'https://ionianfarsi.onrender.com/images/lesson-5/sefid.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/sefid.mp3'),
(110, 'اِداره', 'office', 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-5/edare.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/edare.mp3'),
(111, 'مِداد', 'pencil', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-5/medad.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/medad.mp3'),
(112, 'زَرد', 'yellow', 'اسم، رنگ، صفت', 'https://ionianfarsi.onrender.com/images/lesson-5/zard.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-5/zard.mp3'),
(113, 'نُت', 'music note', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-6/not.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/not.mp3'),
(114, 'نوشابه', 'soft drink', 'اسم، نوشیدنی', 'https://ionianfarsi.onrender.com/images/lesson-6/nushabe.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/nushabe.mp3'),
(115, 'دَندان', 'tooth', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-6/dandan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/dandan.mp3'),
(116, 'بینی', 'nose', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-6/bini.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/bini.mp3'),
(117, 'دوربین', 'camera', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-6/durbin.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/durbin.mp3'),
(118, 'بانک', 'bank', 'اسم،‌ مکان', 'https://ionianfarsi.onrender.com/images/lesson-6/bank.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/bank.mp3'),
(119, 'بَستَنی', 'ice cream', 'اسم، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-6/bastani.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/bastani.mp3'),
(120, 'نان', 'bread', 'اسم، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-6/nan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/nan.mp3'),
(121, 'مِداد', 'pencil', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-6/medad.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/medad.mp3'),
(122, 'مَرد', 'man', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-6/mard.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/mard.mp3'),
(123, 'دامَن', 'skirt', 'اسم، لباس', 'https://ionianfarsi.onrender.com/images/lesson-6/daman.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/daman.mp3'),
(124, 'آسِمان', 'sky', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-6/aseman.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/aseman.mp3'),
(125, 'تیم', 'team', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-6/tim.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/tim.mp3'),
(126, 'نامه', 'letter', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-6/name.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/name.mp3'),
(127, 'بیمار', 'patient', 'اسم، صفت', 'https://ionianfarsi.onrender.com/images/lesson-6/bimar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/bimar.mp3'),
(128, 'بادام', 'almond', 'اسم، آجیل', 'https://ionianfarsi.onrender.com/images/lesson-6/badam.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-6/badam.mp3'),
(129, 'کِتاب', 'book', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-7/ketab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/ketab.mp3'),
(130, 'کُمُد', 'closet', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-7/komod.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/komod.mp3'),
(131, 'دُکمه', 'button', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-7/dokme.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/dokme.mp3'),
(132, 'شِکَر', 'sugar', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-7/shekar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/shekar.mp3'),
(133, 'نَمَک', 'salt', 'اسم، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-7/namak.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/namak.mp3'),
(134, 'تاکسی', 'taxi', 'اسم، حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-7/taksi.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/taksi.mp3'),
(135, 'دَستکِش', 'gloves', 'اسم،‌ لباس', 'https://ionianfarsi.onrender.com/images/lesson-7/dastkesh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/dastkesh.mp3'),
(136, 'پارک', 'park', 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-7/park.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/park.mp3'),
(137, 'گوش', 'ear', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-7/gush.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/gush.mp3'),
(138, 'گُربه', 'cat', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-7/gorbe.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/gorbe.mp3'),
(139, 'کیلوگِرَم', 'kilogram', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-7/kilugeram.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/kilugeram.mp3'),
(140, 'مَگَس', 'fly', 'اسم، حشره', 'https://ionianfarsi.onrender.com/images/lesson-7/magas.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/magas.mp3'),
(141, 'سَگ', 'dog', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-7/sag.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/sag.mp3'),
(142, 'کارگَر', 'worker', 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-7/kargar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/kargar.mp3'),
(143, 'اَنگُشت', 'finger', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-7/angosht.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/angosht.mp3'),
(144, 'گُرگ', 'wolf', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-7/gorg.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-7/gorg.mp3'),
(145, 'لَب', 'lip', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-8/lab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/lab.mp3'),
(146, 'لیوان', 'mug', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/livan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/livan.mp3'),
(147, 'آلمان', 'Germany', 'اسم، کشور', 'https://ionianfarsi.onrender.com/images/lesson-8/alman.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/alman.mp3'),
(148, 'پُلیس', 'police', 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-8/polis.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/polis.mp3'),
(149, 'پُل', 'bridge', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/pol.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/pol.mp3'),
(150, 'سالاد', 'salad', 'اسم، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-8/salad.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/salad.mp3'),
(151, 'گُلدان', 'vase', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/goldan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/goldan.mp3'),
(152, 'پول', 'money', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/pul.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/pul.mp3'),
(153, 'وان', 'bathtub', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/van.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/van.mp3'),
(154, 'والیبال', 'volleyball', 'اسم، ورزش', 'https://ionianfarsi.onrender.com/images/lesson-8/valibal.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/valibal.mp3'),
(155, 'داوَر', 'referee', 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-8/davar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/davar.mp3'),
(156, 'مِسواک', 'toothbrush', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/mesvak.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/mesvak.mp3'),
(157, 'نِگاتیو', 'negative', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/negativ.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/negativ.mp3'),
(158, 'پَروانه', 'butterfly', 'اسم، حشره', 'https://ionianfarsi.onrender.com/images/lesson-8/parvane.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/parvane.mp3'),
(159, 'میوه', 'fruit', 'اسم، میوه', 'https://ionianfarsi.onrender.com/images/lesson-8/mive.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/mive.mp3'),
(160, 'ناو', 'cruiser', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/nav.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/nav.mp3'),
(161, 'خودکار', 'pen', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/khodkar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/khodkar.mp3'),
(162, 'نوزاد', 'baby', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/nozad.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/nozad.mp3'),
(163, 'اُتوبوس', 'bus', 'اسم،‌ حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-8/otobus.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/otobus.mp3'),
(164, 'موبایل', 'mobile', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/mobayl.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/mobayl.mp3'),
(165, 'خورشید', 'sun', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/khorshid.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/khorshid.mp3'),
(166, 'خوشحال', 'happy', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/khoshhal.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/khoshhal.mp3'),
(167, 'آسانسور', 'elevator', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-8/asansor.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/asansor.mp3'),
(168, 'موتور', 'motorcycle', 'اسم، حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-8/motor.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-8/motor.mp3'),
(169, 'حُباب', 'bubble', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/hobab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/hobab.mp3'),
(170, 'حوله', 'towel', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/hole.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/hole.mp3'),
(171, 'ساحِل', 'beach', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/sahel.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/sahel.mp3'),
(172, 'صَحرا', 'desert', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/sahra.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/sahra.mp3'),
(173, 'صُبح', 'morning', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/sobh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/sobh.mp3'),
(174, 'ماشن حِساب', 'calculator', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/mashinhesab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/mashinhesab.mp3'),
(175, 'بَحرِین', 'Bahrain', 'اسم، کشور', 'https://ionianfarsi.onrender.com/images/lesson-9/bahreyn.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/bahreyn.mp3'),
(176, 'تِمساح', 'alligator', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-9/temsah.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/temsah.mp3'),
(177, 'جَنگَل', 'forest', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/jangal.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/jangal.mp3'),
(178, 'جامِدادی', 'pencil case', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/jamedadi.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/jamedadi.mp3'),
(179, 'گوجه فَرَنگی', 'tomato', 'اسم، گیاه', 'https://ionianfarsi.onrender.com/images/lesson-9/gojefarangi.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/gojefarangi.mp3'),
(180, 'مَسجِد', 'mosque', 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-9/masjed.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/masjed.mp3'),
(181, 'گَنج', 'treasure', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/ganj.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/ganj.mp3'),
(182, 'جوجه', 'chicken', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-9/juje.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/juje.mp3'),
(183, 'پَنجَره', 'window', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/panjare.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/panjare.mp3'),
(184, 'تاج', 'crown', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-9/taj.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-9/taj.mp3'),
(185, 'خِرس', 'bear', 'اسم،‌ حیوان', 'https://ionianfarsi.onrender.com/images/lesson-10/khers.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/khers.mp3'),
(186, 'خانه', 'house', 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-10/khane.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/khane.mp3'),
(187, 'کِتاب خانه', 'library', 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-10/ketabkhane.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/ketabkhane.mp3'),
(188, 'تَخت', 'bed', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/takht.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/takht.mp3'),
(189, 'نَخ', 'thread', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/nakh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/nakh.mp3'),
(190, 'دِرَخت', 'tree', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/derakht.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/derakht.mp3'),
(191, 'تَخته سیاه', 'blackboard', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/takhtesiah.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/takhtesiah.mp3'),
(192, 'کاخ', 'castle', 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-10/kakh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/kakh.mp3'),
(193, 'چَتر', 'umbrella', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/chatr.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/chatr.mp3'),
(194, 'چِشم', 'eye', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-10/cheshm.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/cheshm.mp3'),
(195, 'پَرچَم', 'flag', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/parcham.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/parcham.mp3'),
(196, 'باغچه', 'garden', 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-10/baghche.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/baghche.mp3'),
(197, 'ساندِویچ', 'sandwich', 'اسم،‌ غذا، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-10/sandevich.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/sandevich.mp3'),
(198, 'پارچه', 'cloth', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/parche.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/parche.mp3'),
(199, 'پُستچی', 'postman', 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-10/postchi.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/postchi.mp3'),
(200, 'پارچ', 'pitcher', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/parch.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/parch.mp3'),
(201, 'خواب', 'sleep', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/khab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/khab.mp3'),
(202, 'خواهَر', 'sister', 'اسم، اعضای خوانواده', 'https://ionianfarsi.onrender.com/images/lesson-10/khahar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/khahar.mp3'),
(203, 'خوانَنده', 'singer', 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-10/khanande.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/khanande.mp3'),
(204, 'کارت خوان', 'POS', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/kartkhan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/kartkhan.mp3'),
(205, 'تَختِ خواب', 'bed', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/takhtekhab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/takhtekhab.mp3'),
(206, 'خواندَن', 'to read', 'اسم، فعل', 'https://ionianfarsi.onrender.com/images/lesson-10/khandan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/khandan.mp3'),
(207, 'چِراغ خواب', 'night light', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-10/cheraghkhab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/cheraghkhab.mp3'),
(208, 'اُستُخوان', 'bone', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-10/ostokhan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-10/ostokhan.mp3'),
(209, 'فَرش', 'carpet', 'اسم، وسایل خانه', 'https://ionianfarsi.onrender.com/images/lesson-11/farsh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/farsh.mp3'),
(210, 'فوتبال', 'football', 'اسم، ورزش', 'https://ionianfarsi.onrender.com/images/lesson-11/futbal.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/futbal.mp3'),
(211, 'دَفتَر', 'notebook', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/daftar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/daftar.mp3'),
(212, 'کَفش', 'shoes', 'اسم، لباس', 'https://ionianfarsi.onrender.com/images/lesson-11/kafsh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/kafsh.mp3'),
(213, 'کیف', 'bag', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/kif.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/kif.mp3'),
(214, 'دَفتَرچه', 'notebook', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/daftarche.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/daftarche.mp3'),
(215, 'تِلِفُن', 'phone', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/telefon.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/telefon.mp3'),
(216, 'بَرف', 'snow', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/barf.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/barf.mp3'),
(217, 'قَند', 'sugar cube', 'اسم، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-11/ghand.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/ghand.mp3'),
(218, 'قِرمِز', 'red', 'اسم، رنگ، صفت', 'https://ionianfarsi.onrender.com/images/lesson-11/ghermez.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/ghermez.mp3'),
(219, 'چاقو', 'knife', 'اسم، وسایل آشپزخانه', 'https://ionianfarsi.onrender.com/images/lesson-11/chaghu.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/chaghu.mp3'),
(220, 'آفریقا', 'Africa', 'اسم، قاره', 'https://ionianfarsi.onrender.com/images/lesson-11/afrigha.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/afrigha.mp3'),
(221, 'قایِق', 'boat', 'اسم، حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-11/ghayegh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/ghayegh.mp3'),
(222, 'پُرتِقال', 'orange', 'اسم، میوه، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-11/porteghal.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/porteghal.mp3'),
(223, 'بُشقاب', 'plate', 'اسم، وسایل آشپزخانه', 'https://ionianfarsi.onrender.com/images/lesson-11/boshghab.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/boshghab.mp3'),
(224, 'فَندُق', 'hazelnut', 'اسم، خوردنی، آجیل', 'https://ionianfarsi.onrender.com/images/lesson-11/fandogh.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/fandogh.mp3'),
(225, 'بَچّه', 'child', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/bache.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/bache.mp3'),
(226, 'نَقّاش', 'painter', 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-11/naghash.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/naghash.mp3'),
(227, 'پِلّه', 'step', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/pele.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/pele.mp3'),
(228, 'اَرّه', 'saw', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/are.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/are.mp3'),
(229, 'لَکّه', 'stain', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/lake.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/lake.mp3'),
(230, 'بَرّه', 'lamb', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-11/bare.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/bare.mp3'),
(231, 'تَپّه', 'hill', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-11/tape.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/tape.mp3'),
(232, 'کَفّاش', 'shoemaker', 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-11/kafash.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-11/kafash.mp3'),
(233, 'هُلو', 'peach', 'اسم، میوه، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-12/peach.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/peach.mp3'),
(234, 'هِند', 'India', 'اسم، کشور در آسیا', 'https://ionianfarsi.onrender.com/images/lesson-12/India.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/India.mp3'),
(235, 'آهو', 'deer done', 'اسم، حیوان اهلی', 'https://ionianfarsi.onrender.com/images/lesson-12/deer-doe.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/deer-doe.mp3'),
(236, 'شَهر', 'city', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/city.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/city.mp3'),
(237, 'مِه', 'fog', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/fog.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/fog.mp3'),
(238, 'ماهی', 'fish', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-12/fish.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/fish.mp3'),
(239, 'بَهار', 'spring', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/spring.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/spring.mp3'),
(240, 'ماه', 'moon', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/moon.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/moon.mp3'),
(241, 'یَخ', 'ice', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/ice.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/ice.mp3'),
(242, 'یَقه', 'collar', 'اسم، لباس', 'https://ionianfarsi.onrender.com/images/lesson-12/collar.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/collar.mp3'),
(243, 'دَریا', 'sea', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/sea.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/sea.mp3'),
(244, 'قِیچی', 'scissor', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/scissor.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/scissor.mp3'),
(245, 'نِی', 'straw', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/straw.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/straw.mp3'),
(246, 'آینه', 'mirror', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/mirror.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/mirror.mp3'),
(247, 'هَواپِیما', 'airplane', 'اسم، حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-12/airplane.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/airplane.mp3'),
(248, 'چای', 'tea', 'اسم، نوشیدنی', 'https://ionianfarsi.onrender.com/images/lesson-12/tea.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/tea.mp3'),
(249, 'پیاز', 'onion', 'اسم، گیاه', 'https://ionianfarsi.onrender.com/images/lesson-12/onion.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/onion.mp3'),
(250, 'سیاه', 'black', 'اسم، رنگ، صفت', 'https://ionianfarsi.onrender.com/images/lesson-12/black.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/black.mp3'),
(251, 'خیار', 'cucumber', 'اسم، گیاه', 'https://ionianfarsi.onrender.com/images/lesson-12/cucumber.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/cucumber.mp3'),
(252, 'خیابان', 'street', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/street.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/street.mp3'),
(253, 'بیابان', 'desert', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/desert.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/desert.mp3'),
(254, 'آسیا', 'Asia', 'اسم، قاره', 'https://ionianfarsi.onrender.com/images/lesson-12/Asia.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/Asia.mp3'),
(255, 'ایتالیا', 'Italy', 'اسم، کشور در اروپا', 'https://ionianfarsi.onrender.com/images/lesson-12/Italy.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/Italy.mp3'),
(256, 'پیاده رو', 'sidewalk', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-12/sidewalk.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-12/sidewalk.mp3'),
(257, 'صابون', 'soap', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-13/soap.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/soap.mp3'),
(258, 'صورَت', 'face', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-13/face.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/face.mp3'),
(259, 'اِصفِهان', 'Isfahan', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-13/Isfahan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/Isfahan.mp3'),
(260, 'عَصا', 'walking stick', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-13/walking-stick.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/walking-stick.mp3'),
(261, 'رَصَدخانه', 'observatory', 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-13/observatory.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/observatory.mp3'),
(262, 'قَصّاب', 'butcher', 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-13/butcher.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/butcher.mp3'),
(263, 'قُرص', 'tablet', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-13/tablet.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/tablet.mp3'),
(264, 'ضَعیف', 'weak', 'صفت', 'https://ionianfarsi.onrender.com/images/lesson-13/weak.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/weak.mp3'),
(265, 'ظَبطِ صوت', 'tape recorder', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-13/tape-recorder.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/tape-recorder.mp3'),
(266, 'فَضا', 'space', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-13/space.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/space.mp3'),
(267, 'مَریض', 'ill', 'صفت', 'https://ionianfarsi.onrender.com/images/lesson-13/ill.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/ill.mp3'),
(268, 'ریاضی', 'mathematics', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-13/mathematics.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/mathematics.mp3'),
(269, 'فَضانَوَرد', 'astronaut', 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-13/astronaut.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/astronaut.mp3'),
(270, 'حوض', 'pond', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-13/pond.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-13/pond.mp3'),
(271, 'عِینَک', 'glasses', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/glasses.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/glasses.mp3'),
(272, 'عَسَل', 'honey', 'اسم، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-14/honey.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/honey.mp3'),
(273, 'ساعَت', 'watch', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/watch.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/watch.mp3'),
(274, 'جَعبه', 'box', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/box.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/box.mp3'),
(275, 'شَمع', 'candle', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/candle.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/candle.mp3'),
(276, 'رَعدوبَرق', 'thunder-light', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/thunder-light.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/thunder-light.mp3'),
(277, 'مُعَلّم', 'teacher', 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-14/teacher.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/teacher.mp3'),
(278, 'شُروع', 'start', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/start.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/start.mp3'),
(279, 'غَذا', 'food', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/food.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/food.mp3'),
(280, 'غُروب', 'sunset', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/sunset.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/sunset.mp3'),
(281, 'کاغَذ', 'paper', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/paper.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/paper.mp3'),
(282, 'مَغز', 'brain', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-14/brain.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/brain.mp3'),
(283, 'تیغ', 'blade', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-14/blade.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/blade.mp3'),
(284, 'قورباغه', 'frog', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-14/frog.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/frog.mp3'),
(285, 'مَغازه', 'shop', 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-14/shop.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/shop.mp3'),
(286, 'مُرغ', 'hen', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-14/hen.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-14/hen.mp3'),
(287, 'طَلا', 'gold', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-15/gold.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/gold.mp3'),
(288, 'طَناب', 'rope', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-15/rope.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/rope.mp3'),
(289, 'قوطی', 'can', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-15/can.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/can.mp3'),
(290, 'سَطل', 'bucket', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-15/bucket.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/bucket.mp3'),
(291, 'خَط', 'line', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-15/line.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/line.mp3'),
(292, 'طوطی', 'parrot', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-15/parrot.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/parrot.mp3'),
(293, 'قَطار', 'train', 'اسم، حمل و نقل', 'https://ionianfarsi.onrender.com/images/lesson-15/train.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/train.mp3'),
(294, 'حَیاط', 'yard', 'اسم، مکان', 'https://ionianfarsi.onrender.com/images/lesson-15/yard.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/yard.mp3'),
(295, 'ظَرف', 'container', 'اسم، وسایل آشپزخانه', 'https://ionianfarsi.onrender.com/images/lesson-15/container.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/container.mp3'),
(296, 'ظُهر', 'noon', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-15/noon.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/noon.mp3'),
(297, 'نِظافَت چی', 'cleaner', 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-15/cleaner.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/cleaner.mp3'),
(298, 'مُحافِظ', 'budyguard', 'اسم، شغل', 'https://ionianfarsi.onrender.com/images/lesson-15/bodyguard.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/bodyguard.mp3'),
(299, 'ماشینِ ظَرفشویی', 'dishwasher', 'اسم، وسایل آشپزخانه', 'https://ionianfarsi.onrender.com/images/lesson-15/dishwasher.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/dishwasher.mp3'),
(300, 'خُداحافِظ', 'goodbye', 'شبه جمله', 'https://ionianfarsi.onrender.com/images/lesson-15/goodbye.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-15/goodbye.mp3'),
(301, 'ژِله', 'jelly', 'اسم، خوردنی', 'https://ionianfarsi.onrender.com/images/lesson-16/jelly.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/jelly.mp3'),
(302, 'ژاکَت', 'jacket', 'اسم، لباس', 'https://ionianfarsi.onrender.com/images/lesson-16/jacket.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/jacket.mp3'),
(303, 'ماژیک', 'marker', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-16/marker.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/marker.mp3'),
(304, 'بِلژیک', '‌Belgium', 'اسم، کشور در اروپا', 'https://ionianfarsi.onrender.com/images/lesson-16/Belgium.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/Belgium.mp3'),
(305, 'بِژ', 'beige', 'اسم، رنگ', 'https://ionianfarsi.onrender.com/images/lesson-16/beige.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/beige.mp3'),
(306, 'اِژدِها', 'dragon', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-16/dragon.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/dragon.mp3'),
(307, 'مُژه', 'eyelash', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-16/eyelash.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/eyelash.mp3'),
(308, 'دِژ', 'stronghold', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-16/stronghold.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/stronghold.mp3'),
(309, 'ذُرَّت', 'corn', 'اسم، خوردنی، گیاه', 'https://ionianfarsi.onrender.com/images/lesson-16/corn.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/corn.mp3'),
(310, 'ذَرّه بین', 'magnifier', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-16/magnifier.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/magnifier.mp3'),
(311, 'آذَربایجان', 'Azerbaijan', 'اسم، کشور در آسیا', 'https://ionianfarsi.onrender.com/images/lesson-16/Azerbaijan.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/Azerbaijan.mp3'),
(312, 'غَذا', 'food', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-16/food.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/food.mp3'),
(313, 'آذَر', 'persian month', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-16/persian-month.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/persian-month.mp3');
INSERT INTO `word` (`id`, `written_form`, `english_equivalent`, `category`, `image_url`, `audio_url`) VALUES
(314, 'گُذَرنامه', 'passport', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-16/passport.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/passport.mp3'),
(315, 'کاغَذ', 'paper', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-16/paper.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-16/paper.mp3'),
(316, 'ثانیه', 'second', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-17/second.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/second.mp3'),
(317, 'ثِروَتمَند', 'wealthy', 'صفت', 'https://ionianfarsi.onrender.com/images/lesson-17/wealthy.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/wealthy.mp3'),
(318, 'لَثه', 'gum', 'اسم، اعضای بدن', 'https://ionianfarsi.onrender.com/images/lesson-17/gum.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/gum.mp3'),
(319, 'مُثَلَّث', 'triangle', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-17/triangle.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/triangle.mp3'),
(320, 'کَثیف', 'dirty', 'صفت', 'https://ionianfarsi.onrender.com/images/lesson-17/dirty.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/dirty.mp3'),
(321, 'اَثاث', 'furniture', 'اسم، وسایل خانه', 'https://ionianfarsi.onrender.com/images/lesson-17/furniture.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/furniture.mp3'),
(322, 'پَنگوئَن', 'panguin', 'اسم، حیوان', 'https://ionianfarsi.onrender.com/images/lesson-17/penguin.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/penguin.mp3'),
(323, 'رَئیس', 'head', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-17/head.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/head.mp3'),
(324, 'مُتَأَهّل', 'married', 'صفت', 'https://ionianfarsi.onrender.com/images/lesson-17/married.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/married.mp3'),
(325, 'سُؤال', 'question', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-17/question.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/question.mp3'),
(326, 'رَأی', 'vote', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-17/vote.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/vote.mp3'),
(327, 'مُؤَسّسه', 'institute', 'اسم', 'https://ionianfarsi.onrender.com/images/lesson-17/institute.jpg', 'https://ionianfarsi.onrender.com/audio/lesson-17/institute.mp3'),
(328, 'یونان', 'Greece', 'کشور', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/1280px-Flag_of_Greece.svg.png', 'https://ionianfarsi.onrender.com/audio/section-1/Greece.mp3'),
(329, 'تُرکیه', 'Turkiye', 'کشور', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1280px-Flag_of_Turkey.svg.png', 'https://ionianfarsi.onrender.com/audio/section-1/Turkiye.mp3'),
(330, 'سودان', 'Sudan', 'کشور در آفریقا', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Sudan.svg/1920px-Flag_of_Sudan.svg.png', 'https://ionianfarsi.onrender.com/audio/section-1/Sudan.mp3'),
(331, 'لُبنان', 'Lebanon', 'کشور', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Flag_of_Lebanon.svg/1280px-Flag_of_Lebanon.svg.png', 'https://ionianfarsi.onrender.com/audio/section-1/Lebanon.mp3'),
(332, 'کُره', 'Korea', 'کشور در آسیا', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Unification_flag_of_Korea.svg/1280px-Unification_flag_of_Korea.svg.png', 'https://ionianfarsi.onrender.com/audio/section-1/Korea.mp3'),
(333, 'چین', 'China', 'کشور در آسیا', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1280px-Flag_of_the_People%27s_Republic_of_China.svg.png', 'https://ionianfarsi.onrender.com/audio/section-1/China.mp3'),
(335, 'اَست', 'is', 'صرف سوم شخص مفرد فعل بودن', NULL, 'https://ionianfarsi.onrender.com/audio/section-1/is.mp3'),
(336, 'هَستَم', 'am', 'صرف اول شخص مفرد فعل بودن', NULL, 'https://ionianfarsi.onrender.com/audio/section-1/am.mp3'),
(337, 'هَستی', 'are', 'صرف دوم شخص مفرد فعل بودن', NULL, 'https://ionianfarsi.onrender.com/audio/section-1/are.mp3'),
(338, 'علی', 'Ali', 'اسم فرد', NULL, 'https://ionianfarsi.onrender.com/audio/section-1/unit-1/words/Ali.mp3'),
(339, 'به', 'to', NULL, NULL, 'https://ionianfarsi.onrender.com/audio/section-1/unit-1/words/to.mp3'),
(340, 'مَدرِسه', 'school', 'مکان', NULL, 'https://ionianfarsi.onrender.com/audio/section-1/unit-1/words/school.mp3'),
(341, 'می‌رَوَد', 'goes', 'سوم شخص مفرد فعل رفتن', NULL, 'https://ionianfarsi.onrender.com/audio/section-1/unit-1/words/goes.mp3'),
(342, 'سَلام', 'Hello', NULL, NULL, 'https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/Hello.mp3'),
(343, 'اِسم', 'name', 'ضمایر شخصی', NULL, 'https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/name.mp3'),
(344, 'مَن', 'i', 'ضمایر شخصی', NULL, 'https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/i.mp3'),
(345, 'تو', 'you', 'ضمایر شخصی', NULL, 'https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/you.mp3'),
(346, 'چیست', 'what is', NULL, NULL, 'https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/what-is.mp3'),
(347, 'سیما', 'Sima', 'اسم فرد', NULL, 'https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/Sima.mp3'),
(348, 'پِدرام', 'Pedram', 'اسم فرد', NULL, 'https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/Pedram.mp3'),
(349, 'مَریَم', 'Mary', 'اسم فرد', NULL, NULL),
(350, 'کُجا', 'where', NULL, NULL, 'https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/where.mp3');

-- --------------------------------------------------------

--
-- Table structure for table `words_in_challenge_match`
--

CREATE TABLE `words_in_challenge_match` (
  `word_id` int(11) NOT NULL,
  `challenge_match_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `words_in_sentence`
--

CREATE TABLE `words_in_sentence` (
  `id` int(11) NOT NULL,
  `word_id` int(11) NOT NULL,
  `sentence_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `challenge`
--
ALTER TABLE `challenge`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `challenges_in_lesson`
--
ALTER TABLE `challenges_in_lesson`
  ADD KEY `challenges_in_lesson_ibfk_2` (`lesson_id`),
  ADD KEY `challenges_in_lesson_ibfk_1` (`challenge_id`);

--
-- Indexes for table `challenge_match`
--
ALTER TABLE `challenge_match`
  ADD PRIMARY KEY (`id`),
  ADD KEY `challenge_id` (`challenge_id`);

--
-- Indexes for table `challenge_select`
--
ALTER TABLE `challenge_select`
  ADD PRIMARY KEY (`id`),
  ADD KEY `word_id` (`word_id`),
  ADD KEY `challenge_id` (`challenge_id`),
  ADD KEY `sentence_id` (`sentence_id`);

--
-- Indexes for table `challenge_select_option`
--
ALTER TABLE `challenge_select_option`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correct` (`correct`,`word_id`),
  ADD KEY `word_id` (`word_id`);

--
-- Indexes for table `challenge_sort`
--
ALTER TABLE `challenge_sort`
  ADD PRIMARY KEY (`id`),
  ADD KEY `challenge_id` (`challenge_id`),
  ADD KEY `sentence_id` (`sentence_id`),
  ADD KEY `word_id` (`word_id`);

--
-- Indexes for table `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `letter`
--
ALTER TABLE `letter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `writing_style` (`writing_style`),
  ADD KEY `writing_style_2` (`writing_style`);

--
-- Indexes for table `options_in_challenge_select`
--
ALTER TABLE `options_in_challenge_select`
  ADD PRIMARY KEY (`challenge_select_id`,`challenge_select_option_id`),
  ADD KEY `challenge_select_opetion_id` (`challenge_select_option_id`);

--
-- Indexes for table `repetitions`
--
ALTER TABLE `repetitions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `repetitions_in_unit` (`unit_id`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sentence`
--
ALTER TABLE `sentence`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `current_section` (`current_section`),
  ADD KEY `current_unit` (`current_unit`),
  ADD KEY `current_lesson` (`current_lesson`);

--
-- Indexes for table `word`
--
ALTER TABLE `word`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `words_in_challenge_match`
--
ALTER TABLE `words_in_challenge_match`
  ADD PRIMARY KEY (`word_id`,`challenge_match_id`),
  ADD KEY `challenge_match_id` (`challenge_match_id`);

--
-- Indexes for table `words_in_sentence`
--
ALTER TABLE `words_in_sentence`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sentence_id` (`sentence_id`,`word_id`),
  ADD KEY `word_id` (`word_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `challenge`
--
ALTER TABLE `challenge`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=501;
--
-- AUTO_INCREMENT for table `challenge_match`
--
ALTER TABLE `challenge_match`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `challenge_select`
--
ALTER TABLE `challenge_select`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `challenge_select_option`
--
ALTER TABLE `challenge_select_option`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `challenge_sort`
--
ALTER TABLE `challenge_sort`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `lesson`
--
ALTER TABLE `lesson`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `letter`
--
ALTER TABLE `letter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT for table `repetitions`
--
ALTER TABLE `repetitions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `sentence`
--
ALTER TABLE `sentence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `unit`
--
ALTER TABLE `unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `word`
--
ALTER TABLE `word`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=351;
--
-- AUTO_INCREMENT for table `words_in_sentence`
--
ALTER TABLE `words_in_sentence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `challenges_in_lesson`
--
ALTER TABLE `challenges_in_lesson`
  ADD CONSTRAINT `challenges_in_lesson_ibfk_1` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `challenges_in_lesson_ibfk_2` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `challenge_match`
--
ALTER TABLE `challenge_match`
  ADD CONSTRAINT `challenge_match_ibfk_1` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `challenge_select`
--
ALTER TABLE `challenge_select`
  ADD CONSTRAINT `challenge_select_ibfk_1` FOREIGN KEY (`word_id`) REFERENCES `word` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `challenge_select_ibfk_2` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `challenge_select_ibfk_3` FOREIGN KEY (`sentence_id`) REFERENCES `sentence` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `challenge_select_option`
--
ALTER TABLE `challenge_select_option`
  ADD CONSTRAINT `challenge_select_option_ibfk_1` FOREIGN KEY (`word_id`) REFERENCES `word` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `challenge_sort`
--
ALTER TABLE `challenge_sort`
  ADD CONSTRAINT `challenge_sort_ibfk_1` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `challenge_sort_ibfk_2` FOREIGN KEY (`sentence_id`) REFERENCES `sentence` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `challenge_sort_ibfk_3` FOREIGN KEY (`word_id`) REFERENCES `word` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `options_in_challenge_select`
--
ALTER TABLE `options_in_challenge_select`
  ADD CONSTRAINT `options_in_challenge_select_ibfk_1` FOREIGN KEY (`challenge_select_id`) REFERENCES `challenge_select` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_in_challenge_select_ibfk_2` FOREIGN KEY (`challenge_select_option_id`) REFERENCES `challenge_select_option` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `repetitions`
--
ALTER TABLE `repetitions`
  ADD CONSTRAINT `repetitions_in_unit` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `unit`
--
ALTER TABLE `unit`
  ADD CONSTRAINT `unit_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`current_section`) REFERENCES `section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`current_unit`) REFERENCES `unit` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`current_lesson`) REFERENCES `lesson` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `words_in_challenge_match`
--
ALTER TABLE `words_in_challenge_match`
  ADD CONSTRAINT `words_in_challenge_match_ibfk_1` FOREIGN KEY (`word_id`) REFERENCES `word` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `words_in_challenge_match_ibfk_2` FOREIGN KEY (`challenge_match_id`) REFERENCES `challenge_match` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `words_in_sentence`
--
ALTER TABLE `words_in_sentence`
  ADD CONSTRAINT `words_in_sentence_ibfk_1` FOREIGN KEY (`sentence_id`) REFERENCES `sentence` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `words_in_sentence_ibfk_2` FOREIGN KEY (`word_id`) REFERENCES `word` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;