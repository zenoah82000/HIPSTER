-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2020 年 07 朁E05 日 19:13
-- 伺服器版本： 10.4.11-MariaDB
-- PHP 版本： 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `database_1`
--

-- --------------------------------------------------------

--
-- 資料表結構 `article_comment`
--

CREATE TABLE `article_comment` (
  `commentId` int(11) NOT NULL COMMENT '文章評論ID',
  `articleId` int(11) NOT NULL COMMENT '文章ID',
  `memberId` int(11) NOT NULL COMMENT '會員ID',
  `commentContent` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `commentParentId` int(11) NOT NULL COMMENT '上層評論編號',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '建立時間',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `article_comment`
--

INSERT INTO `article_comment` (`commentId`, `articleId`, `memberId`, `commentContent`, `commentParentId`, `created_at`, `updated_at`) VALUES
(1, 3, 60, 'comcomcomcomc', 0, '2020-07-05 17:15:38', '2020-07-05 17:45:13'),
(2, 5, 60, 'fddbbxcvbcvbcvbcbv', 0, '2020-07-05 17:41:11', '2020-07-05 17:45:01'),
(3, 15, 60, 'postcommentddd', 0, '2020-07-06 00:21:38', '2020-07-06 00:21:38'),
(4, 3, 60, '2165156165165', 0, '2020-07-06 01:05:54', '2020-07-06 01:05:54'),
(5, 3, 60, '實驗跳轉', 0, '2020-07-06 01:07:11', '2020-07-06 01:07:11'),
(6, 1, 60, '第一篇文章不能沒有評論', 0, '2020-07-06 01:07:55', '2020-07-06 01:07:55');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `article_comment`
--
ALTER TABLE `article_comment`
  ADD PRIMARY KEY (`commentId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `article_comment`
--
ALTER TABLE `article_comment`
  MODIFY `commentId` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章評論ID', AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
