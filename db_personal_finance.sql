-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 03, 2026 at 09:59 AM
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
-- Database: `db_personal_finance`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

CREATE TABLE `attachments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `transaction_id` bigint(20) UNSIGNED NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attachments`
--

INSERT INTO `attachments` (`id`, `transaction_id`, `file_name`, `file_path`, `created_at`, `updated_at`) VALUES
(1, 1, 'receipt-1.pdf', 'attachments/receipt-1.pdf', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(2, 2, 'receipt-2.pdf', 'attachments/receipt-2.pdf', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(3, 3, 'receipt-3.pdf', 'attachments/receipt-3.pdf', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(4, 4, 'receipt-4.pdf', 'attachments/receipt-4.pdf', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(5, 5, 'receipt-5.pdf', 'attachments/receipt-5.pdf', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(6, 6, 'receipt-1.pdf', 'attachments/receipt-1.pdf', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(7, 7, 'receipt-2.pdf', 'attachments/receipt-2.pdf', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(8, 8, 'receipt-3.pdf', 'attachments/receipt-3.pdf', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(9, 9, 'receipt-4.pdf', 'attachments/receipt-4.pdf', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(10, 10, 'receipt-5.pdf', 'attachments/receipt-5.pdf', '2026-07-31 03:08:53', '2026-07-31 03:08:53');

-- --------------------------------------------------------

--
-- Table structure for table `budgets`
--

CREATE TABLE `budgets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `month` tinyint(3) UNSIGNED NOT NULL,
  `year` smallint(5) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `budgets`
--

INSERT INTO `budgets` (`id`, `user_id`, `category_id`, `amount`, `month`, `year`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 200.00, 7, 2026, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(2, 1, 2, 80.00, 7, 2026, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(3, 1, 3, 150.00, 7, 2026, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(4, 1, 4, 100.00, 7, 2026, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(5, 1, 5, 120.00, 7, 2026, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(6, 6, 6, 200.00, 7, 2026, '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(7, 6, 7, 80.00, 7, 2026, '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(8, 6, 8, 150.00, 7, 2026, '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(9, 6, 9, 100.00, 7, 2026, '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(10, 6, 10, 120.00, 7, 2026, '2026-07-31 03:08:53', '2026-07-31 03:08:53');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `currencies`
--

CREATE TABLE `currencies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(10) NOT NULL,
  `symbol` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `exchange_rate` decimal(18,6) NOT NULL DEFAULT 1.000000,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `currencies`
--

INSERT INTO `currencies` (`id`, `code`, `symbol`, `name`, `exchange_rate`, `created_at`, `updated_at`) VALUES
(1, 'USD', '$', 'US Dollar', 1.000000, '2026-07-31 03:04:09', '2026-07-31 03:04:09'),
(2, 'EUR', '€', 'Euro', 0.920000, '2026-07-31 03:04:09', '2026-07-31 03:04:09'),
(3, 'KHR', '៛', 'Cambodian Riel', 4100.000000, '2026-07-31 03:04:09', '2026-07-31 03:04:09'),
(4, 'THB', '฿', 'Thai Baht', 35.500000, '2026-07-31 03:04:09', '2026-07-31 03:04:09'),
(5, 'GBP', '£', 'British Pound', 0.790000, '2026-07-31 03:04:09', '2026-07-31 03:04:09');

-- --------------------------------------------------------

--
-- Table structure for table `expense_categories`
--

CREATE TABLE `expense_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expense_categories`
--

INSERT INTO `expense_categories` (`id`, `user_id`, `name`, `icon`, `color`, `created_at`, `updated_at`) VALUES
(1, 1, 'Food', 'food', '#ef4444', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(2, 1, 'Transport', 'transport', '#f97316', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(3, 1, 'Shopping', 'shopping', '#eab308', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(4, 1, 'Entertainment', 'entertainment', '#a855f7', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(5, 1, 'Bills', 'bills', '#3b82f6', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(6, 6, 'Food', 'food', '#ef4444', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(7, 6, 'Transport', 'transport', '#f97316', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(8, 6, 'Shopping', 'shopping', '#eab308', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(9, 6, 'Entertainment', 'entertainment', '#a855f7', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(10, 6, 'Bills', 'bills', '#3b82f6', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(11, 7, 'Food', 'food', '#ef4444', '2026-08-02 20:11:04', '2026-08-02 20:11:04'),
(12, 7, 'Transport', 'transport', '#f97316', '2026-08-02 20:11:04', '2026-08-02 20:11:04'),
(13, 7, 'Shopping', 'shopping', '#eab308', '2026-08-02 20:11:04', '2026-08-02 20:11:04'),
(14, 7, 'Entertainment', 'entertainment', '#a855f7', '2026-08-02 20:11:04', '2026-08-02 20:11:04'),
(15, 7, 'Bills', 'bills', '#3b82f6', '2026-08-02 20:11:04', '2026-08-02 20:11:04');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `income_categories`
--

CREATE TABLE `income_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `income_categories`
--

INSERT INTO `income_categories` (`id`, `user_id`, `name`, `icon`, `color`, `created_at`, `updated_at`) VALUES
(1, 1, 'Salary', 'salary', '#22c55e', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(2, 1, 'Bonus', 'bonus', '#16a34a', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(3, 1, 'Freelance', 'freelance', '#15803d', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(4, 1, 'Investment', 'investment', '#166534', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(5, 1, 'Gift', 'gift', '#14532d', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(6, 6, 'Salary', 'salary', '#22c55e', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(7, 6, 'Bonus', 'bonus', '#16a34a', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(8, 6, 'Freelance', 'freelance', '#15803d', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(9, 6, 'Investment', 'investment', '#166534', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(10, 6, 'Gift', 'gift', '#14532d', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(11, 7, 'Salary', 'salary', '#22c55e', '2026-08-02 20:11:04', '2026-08-02 20:11:04'),
(12, 7, 'Bonus', 'bonus', '#16a34a', '2026-08-02 20:11:04', '2026-08-02 20:11:04'),
(13, 7, 'Freelance', 'freelance', '#15803d', '2026-08-02 20:11:04', '2026-08-02 20:11:04'),
(14, 7, 'Investment', 'investment', '#166534', '2026-08-02 20:11:04', '2026-08-02 20:11:04'),
(15, 7, 'Gift', 'gift', '#14532d', '2026-08-02 20:11:04', '2026-08-02 20:11:04');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_07_31_000001_create_currencies_table', 1),
(5, '2026_07_31_000002_create_wallets_table', 1),
(6, '2026_07_31_000003_create_income_categories_table', 1),
(7, '2026_07_31_000004_create_expense_categories_table', 1),
(8, '2026_07_31_000005_create_transactions_table', 1),
(9, '2026_07_31_000006_create_transfers_table', 1),
(10, '2026_07_31_000007_create_budgets_table', 1),
(11, '2026_07_31_000008_create_savings_goals_table', 1),
(12, '2026_07_31_000009_create_saving_transactions_table', 1),
(13, '2026_07_31_000010_create_recurring_transactions_table', 1),
(14, '2026_07_31_000011_create_notifications_table', 1),
(15, '2026_07_31_000012_create_attachments_table', 1),
(16, '2026_07_31_000013_create_tags_table', 1),
(17, '2026_07_31_000014_create_transaction_tags_table', 1),
(18, '2026_07_31_000015_create_settings_table', 1),
(19, '2026_07_31_000016_create_roles_and_permissions_tables', 1),
(20, '2026_08_03_000001_create_salaries_table', 2),
(21, '2026_08_03_100000_add_google_id_to_users_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `title`, `message`, `is_read`, `created_at`, `updated_at`) VALUES
(1, 1, 'Budget alert', 'Food budget is at 80% this month.', 0, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(2, 1, 'Salary received', 'Monthly salary was recorded successfully.', 1, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(3, 1, 'Savings reminder', 'Add $50 to your Emergency Fund today.', 0, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(4, 1, 'Bill due soon', 'Internet bill is due in 3 days.', 0, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(5, 1, 'Transfer completed', 'Transfer from ABA Bank to Cash completed.', 1, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(6, 6, 'Budget alert', 'Food budget is at 80% this month.', 1, '2026-07-31 03:08:53', '2026-07-31 03:10:23'),
(7, 6, 'Salary received', 'Monthly salary was recorded successfully.', 1, '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(8, 6, 'Savings reminder', 'Add $50 to your Emergency Fund today.', 1, '2026-07-31 03:08:53', '2026-07-31 03:10:20'),
(9, 6, 'Bill due soon', 'Internet bill is due in 3 days.', 1, '2026-07-31 03:08:53', '2026-07-31 03:10:21'),
(10, 6, 'Transfer completed', 'Transfer from ABA Bank to Cash completed.', 1, '2026-07-31 03:08:53', '2026-07-31 03:08:53');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'manage_users', '2026-07-31 03:04:09', '2026-07-31 03:04:09'),
(2, 'manage_wallets', '2026-07-31 03:04:09', '2026-07-31 03:04:09'),
(3, 'manage_transactions', '2026-07-31 03:04:09', '2026-07-31 03:04:09'),
(4, 'manage_budgets', '2026-07-31 03:04:09', '2026-07-31 03:04:09'),
(5, 'manage_settings', '2026-07-31 03:04:09', '2026-07-31 03:04:09');

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

CREATE TABLE `permission_role` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission_role`
--

INSERT INTO `permission_role` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 3),
(5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `recurring_transactions`
--

CREATE TABLE `recurring_transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `wallet_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `type` enum('income','expense') NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `title` varchar(255) NOT NULL,
  `frequency` enum('daily','weekly','monthly','yearly') NOT NULL,
  `next_run` date NOT NULL,
  `status` enum('active','paused','completed') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `recurring_transactions`
--

INSERT INTO `recurring_transactions` (`id`, `user_id`, `wallet_id`, `category_id`, `type`, `amount`, `title`, `frequency`, `next_run`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 1, 'income', 1200.00, 'Monthly Salary', 'monthly', '2026-08-01', 'active', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(2, 1, 2, 5, 'expense', 45.00, 'Internet Bill', 'monthly', '2026-08-02', 'active', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(3, 1, 1, 1, 'expense', 5.00, 'Coffee Habit', 'daily', '2026-08-03', 'active', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(4, 1, 2, 2, 'expense', 20.00, 'Weekly Transport Pass', 'weekly', '2026-08-04', 'active', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(5, 1, 2, 4, 'income', 500.00, 'Dividend Payout', 'yearly', '2026-08-05', 'active', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(6, 6, 8, 6, 'income', 1200.00, 'Monthly Salary', 'monthly', '2026-08-01', 'active', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(7, 6, 8, 10, 'expense', 45.00, 'Internet Bill', 'monthly', '2026-08-02', 'active', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(8, 6, 7, 6, 'expense', 5.00, 'Coffee Habit', 'daily', '2026-08-03', 'active', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(9, 6, 8, 7, 'expense', 20.00, 'Weekly Transport Pass', 'weekly', '2026-08-04', 'active', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(10, 6, 8, 9, 'income', 500.00, 'Dividend Payout', 'yearly', '2026-08-05', 'active', '2026-07-31 03:08:53', '2026-07-31 03:08:53');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'admin', '2026-07-31 03:04:09', '2026-07-31 03:04:09'),
(2, 'user', '2026-07-31 03:04:09', '2026-07-31 03:04:09'),
(3, 'manager', '2026-07-31 03:04:09', '2026-07-31 03:04:09'),
(4, 'accountant', '2026-07-31 03:04:09', '2026-07-31 03:04:09'),
(5, 'viewer', '2026-07-31 03:04:09', '2026-07-31 03:04:09');

-- --------------------------------------------------------

--
-- Table structure for table `role_user`
--

CREATE TABLE `role_user` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_user`
--

INSERT INTO `role_user` (`user_id`, `role_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 1),
(7, 2);

-- --------------------------------------------------------

--
-- Table structure for table `salaries`
--

CREATE TABLE `salaries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `wallet_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'Salary',
  `amount` decimal(15,2) NOT NULL,
  `currency` varchar(10) NOT NULL DEFAULT 'USD',
  `month` tinyint(3) UNSIGNED NOT NULL,
  `year` smallint(5) UNSIGNED NOT NULL,
  `payment_date` date NOT NULL,
  `note` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `salaries`
--

INSERT INTO `salaries` (`id`, `user_id`, `wallet_id`, `title`, `amount`, `currency`, `month`, `year`, `payment_date`, `note`, `created_at`, `updated_at`) VALUES
(1, 6, NULL, 'Monthly Salary', 500.00, 'USD', 7, 2026, '2026-08-03', NULL, '2026-08-02 19:55:15', '2026-08-02 19:55:15'),
(2, 6, NULL, 'Monthly Salary', 400.00, 'USD', 8, 2025, '2025-08-03', NULL, '2026-08-02 20:44:47', '2026-08-02 20:44:47');

-- --------------------------------------------------------

--
-- Table structure for table `savings_goals`
--

CREATE TABLE `savings_goals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `target_amount` decimal(15,2) NOT NULL,
  `current_amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `deadline` date DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `savings_goals`
--

INSERT INTO `savings_goals` (`id`, `user_id`, `name`, `target_amount`, `current_amount`, `deadline`, `icon`, `created_at`, `updated_at`) VALUES
(1, 1, 'Emergency Fund', 3000.00, 850.00, '2027-03-31', 'shield', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(2, 1, 'New Laptop', 1200.00, 400.00, '2026-12-01', 'laptop', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(3, 1, 'Vacation Trip', 2000.00, 600.00, '2027-05-31', 'plane', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(4, 1, 'Motorbike', 1500.00, 250.00, '2027-07-31', 'bike', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(5, 1, 'Home Deposit', 10000.00, 2200.00, '2028-07-31', 'home', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(6, 6, 'Emergency Fund', 3000.00, 850.00, '2027-03-31', 'shield', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(7, 6, 'New Laptop', 1200.00, 400.00, '2026-12-01', 'laptop', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(8, 6, 'Vacation Trip', 2000.00, 600.00, '2027-05-31', 'plane', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(9, 6, 'Motorbike', 1500.00, 250.00, '2027-07-31', 'bike', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(10, 6, 'Home Deposit', 10000.00, 2200.00, '2028-07-31', 'home', '2026-07-31 03:08:53', '2026-07-31 03:08:53');

-- --------------------------------------------------------

--
-- Table structure for table `saving_transactions`
--

CREATE TABLE `saving_transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `goal_id` bigint(20) UNSIGNED NOT NULL,
  `wallet_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `type` enum('deposit','withdraw') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `saving_transactions`
--

INSERT INTO `saving_transactions` (`id`, `goal_id`, `wallet_id`, `amount`, `type`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 200.00, 'deposit', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(2, 1, 2, 150.00, 'deposit', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(3, 2, 2, 100.00, 'deposit', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(4, 3, 5, 50.00, 'deposit', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(5, 2, 1, 25.00, 'withdraw', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(6, 6, 8, 200.00, 'deposit', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(7, 6, 8, 150.00, 'deposit', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(8, 7, 8, 100.00, 'deposit', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(9, 8, 11, 50.00, 'deposit', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(10, 7, 7, 25.00, 'withdraw', '2026-07-31 03:08:53', '2026-07-31 03:08:53');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('8WBHcbxc8FdJlAAS9wkCAOwIlPDPar0f2ftDNeSL', 6, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiRHlsRUhWRHBpb0VKRVl6OXF2UVB1QlB1MWwzWUxkSTNZbXozWVhlMSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6NjtzOjY6ImxvY2FsZSI7czoyOiJrbSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYXNoYm9hcmQiO3M6NToicm91dGUiO3M6OToiZGFzaGJvYXJkIjt9fQ==', 1785734111),
('y37AHkBKC1T888Qe8HQp2uvamGzamWQF8VFNWbWr', 6, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoiaFl4SEZxS2l2bDluWmJKdG9HaVZZS0UxbWF1cjJPVURZRk01ZXR5diI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjI3OiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvbG9naW4iO3M6NToicm91dGUiO3M6NToibG9naW4iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjY6ImxvY2FsZSI7czoyOiJlbiI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Njt9', 1785743619);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `theme` varchar(255) NOT NULL DEFAULT 'light',
  `currency` varchar(10) NOT NULL DEFAULT 'USD',
  `language` varchar(10) NOT NULL DEFAULT 'en',
  `date_format` varchar(255) NOT NULL DEFAULT 'Y-m-d',
  `notification` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `user_id`, `theme`, `currency`, `language`, `date_format`, `notification`, `created_at`, `updated_at`) VALUES
(1, 1, 'light', 'USD', 'en', 'Y-m-d', 1, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(2, 2, 'dark', 'KHR', 'en', 'd/m/Y', 1, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(3, 3, 'light', 'USD', 'en', 'Y-m-d', 1, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(4, 4, 'dark', 'THB', 'en', 'd/m/Y', 1, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(5, 5, 'light', 'USD', 'en', 'Y-m-d', 1, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(6, 6, 'dark', 'USD', 'en', 'Y-m-d', 1, '2026-07-31 03:07:03', '2026-08-02 21:49:41'),
(7, 7, 'light', 'USD', 'en', 'Y-m-d', 1, '2026-08-02 20:11:04', '2026-08-02 20:11:04');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `user_id`, `name`, `color`, `created_at`, `updated_at`) VALUES
(1, 1, 'Work', '#0f766e', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(2, 1, 'Family', '#db2777', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(3, 1, 'Travel', '#2563eb', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(4, 1, 'Urgent', '#dc2626', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(5, 1, 'Personal', '#7c3aed', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(6, 6, 'Work', '#0f766e', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(7, 6, 'Family', '#db2777', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(8, 6, 'Travel', '#2563eb', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(9, 6, 'Urgent', '#dc2626', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(10, 6, 'Personal', '#7c3aed', '2026-07-31 03:08:53', '2026-07-31 03:08:53');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `wallet_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `type` enum('income','expense','transfer') NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `note` text DEFAULT NULL,
  `transaction_date` date NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `wallet_id`, `category_id`, `type`, `amount`, `note`, `transaction_date`, `attachment`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 1, 'income', 1200.00, 'Monthly salary', '2026-07-11', NULL, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(2, 1, 1, 1, 'expense', 18.50, 'Lunch at cafe', '2026-07-26', NULL, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(3, 1, 2, 5, 'expense', 45.00, 'Internet bill', '2026-07-23', NULL, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(4, 1, 5, 3, 'income', 300.00, 'Freelance website', '2026-07-28', NULL, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(5, 1, 1, 2, 'expense', 6.00, 'Grab ride', '2026-07-30', NULL, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(6, 6, 8, 6, 'income', 1200.00, 'Monthly salary', '2026-07-11', NULL, '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(7, 6, 7, 6, 'expense', 18.50, 'Lunch at cafe', '2026-07-26', NULL, '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(8, 6, 8, 10, 'expense', 45.00, 'Internet bill', '2026-07-23', NULL, '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(9, 6, 11, 8, 'income', 300.00, 'Freelance website', '2026-07-28', NULL, '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(10, 6, 7, 7, 'expense', 6.00, 'Grab ride', '2026-07-30', NULL, '2026-07-31 03:08:53', '2026-07-31 03:08:53');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_tags`
--

CREATE TABLE `transaction_tags` (
  `transaction_id` bigint(20) UNSIGNED NOT NULL,
  `tag_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transaction_tags`
--

INSERT INTO `transaction_tags` (`transaction_id`, `tag_id`) VALUES
(1, 1),
(2, 5),
(3, 1),
(4, 1),
(5, 4),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `transfers`
--

CREATE TABLE `transfers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `from_wallet_id` bigint(20) UNSIGNED NOT NULL,
  `to_wallet_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `note` text DEFAULT NULL,
  `transfer_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transfers`
--

INSERT INTO `transfers` (`id`, `user_id`, `from_wallet_id`, `to_wallet_id`, `amount`, `note`, `transfer_date`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 1, 50.00, 'ATM cash out', '2026-07-21', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(2, 1, 2, 5, 30.00, 'Top up Wing', '2026-07-24', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(3, 1, 5, 1, 10.00, 'Cash from Wing', '2026-07-27', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(4, 1, 2, 4, 100.00, 'Pay credit card', '2026-07-29', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(5, 1, 1, 5, 15.00, 'Move to e-wallet', '2026-07-30', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(6, 6, 8, 7, 50.00, 'ATM cash out', '2026-07-21', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(7, 6, 8, 11, 30.00, 'Top up Wing', '2026-07-24', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(8, 6, 11, 7, 10.00, 'Cash from Wing', '2026-07-27', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(9, 6, 8, 10, 100.00, 'Pay credit card', '2026-07-29', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(10, 6, 7, 11, 15.00, 'Move to e-wallet', '2026-07-30', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(11, 6, 8, 13, 0.50, NULL, '2026-07-31', '2026-07-31 03:56:38', '2026-07-31 03:56:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `currency` varchar(10) NOT NULL DEFAULT 'USD',
  `timezone` varchar(255) NOT NULL DEFAULT 'UTC',
  `language` varchar(10) NOT NULL DEFAULT 'en',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `google_id`, `phone`, `password`, `avatar`, `currency`, `timezone`, `language`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@financehub.com', NULL, '+85510000001', '$2y$12$gxn7XobvCoXbYOwdWwzG6edZwgaTjicklvWXKFInWm6Kd7OxAy7Pm', NULL, 'USD', 'Asia/Phnom_Penh', 'en', '2026-07-31 03:04:09', NULL, '2026-07-31 03:04:09', '2026-07-31 03:04:09'),
(2, 'Sokha Chen', 'sokha@example.com', NULL, '+85510000002', '$2y$12$mEG42T7efrWa.X3vqZ3HxOBwsvlWQ9fYpV2SRTuOn7EfJjQYO9.WO', NULL, 'KHR', 'Asia/Phnom_Penh', 'en', '2026-07-31 03:04:09', NULL, '2026-07-31 03:04:09', '2026-07-31 03:04:09'),
(3, 'Dara Kim', 'dara@example.com', NULL, '+85510000003', '$2y$12$ZKNuw0STzfGVVb5T6QjV3eRynckO4BSd7HsoPNqMOveKiI3nKk5rC', NULL, 'USD', 'Asia/Phnom_Penh', 'en', '2026-07-31 03:04:09', NULL, '2026-07-31 03:04:09', '2026-07-31 03:04:09'),
(4, 'Sreymom Ly', 'sreymom@example.com', NULL, '+85510000004', '$2y$12$0o2S5NuCKZ62mDwlSPYep.YPerU1vgpkoMyLBPmJPzOdFunn5FUOW', NULL, 'THB', 'Asia/Phnom_Penh', 'en', '2026-07-31 03:04:10', NULL, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(5, 'Vannak Meas', 'vannak@example.com', NULL, '+85510000005', '$2y$12$iKhIr2YfF2rPxTNXMNECUOHoALzEULOnEyeaxZbmgI5pk9EwoZfkC', NULL, 'USD', 'Asia/Phnom_Penh', 'en', '2026-07-31 03:04:10', NULL, '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(6, 'chamrern', 'chamrern@gmail.com', NULL, '04343423434', '$2y$12$f/0YLNPbEnwSclKj/LBbJ.VdxnY3C//vbQrbVDLfJWHUSmkMQph1q', NULL, 'USD', 'UTC', 'en', NULL, NULL, '2026-07-31 03:05:35', '2026-08-02 22:14:22'),
(7, 'chamrern2', 'chamrern2@gmail.com', NULL, '0454354355', '$2y$12$2QItMAI5M/Y3soz/aemFbOetZf5QGw0Gi59WdWlmW4sNyoYiqJ2FS', NULL, 'USD', 'Asia/Phnom_Penh', 'en', NULL, NULL, '2026-08-02 20:11:04', '2026-08-02 20:11:04');

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

CREATE TABLE `wallets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('Cash','Bank','Credit Card','E-Wallet') NOT NULL,
  `balance` decimal(15,2) NOT NULL DEFAULT 0.00,
  `currency` varchar(10) NOT NULL DEFAULT 'USD',
  `color` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wallets`
--

INSERT INTO `wallets` (`id`, `user_id`, `name`, `type`, `balance`, `currency`, `color`, `icon`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Cash', 'Cash', 250.00, 'USD', '#22c55e', 'cash', 'active', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(2, 1, 'ABA Bank', 'Bank', 1850.50, 'USD', '#3b82f6', 'bank', 'active', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(3, 1, 'ACLEDA', 'Bank', 3200000.00, 'KHR', '#0ea5e9', 'bank', 'active', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(4, 1, 'Visa Card', 'Credit Card', -120.00, 'USD', '#f59e0b', 'card', 'active', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(5, 1, 'Wing', 'E-Wallet', 75.25, 'USD', '#a855f7', 'ewallet', 'active', '2026-07-31 03:04:10', '2026-07-31 03:04:10'),
(7, 6, 'Cash', 'Cash', 250.00, 'USD', '#22c55e', 'cash', 'active', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(8, 6, 'ABA Bank', 'Bank', 1850.00, 'USD', '#3b82f6', 'bank', 'active', '2026-07-31 03:08:53', '2026-07-31 03:56:38'),
(9, 6, 'ACLEDA - Riel', 'Bank', 3200000.00, 'KHR', '#0ea5e9', 'bank', 'active', '2026-07-31 03:08:53', '2026-08-02 22:04:26'),
(10, 6, 'Visa Card', 'Credit Card', -120.00, 'USD', '#f59e0b', 'card', 'active', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(11, 6, 'Wing', 'E-Wallet', 75.25, 'USD', '#a855f7', 'ewallet', 'active', '2026-07-31 03:08:53', '2026-07-31 03:08:53'),
(12, 6, 'ACLEDA', 'Bank', 1000.00, 'USD', '#0f766e', 'wallet', 'active', '2026-07-31 03:28:27', '2026-07-31 03:28:27'),
(13, 6, 'ABA Bank - Riel', 'Bank', 402050.00, 'KHR', '#0f766e', 'wallet', 'active', '2026-07-31 03:51:34', '2026-08-02 22:06:13'),
(14, 7, 'Cash', 'Cash', 0.00, 'USD', '#22c55e', 'cash', 'active', '2026-08-02 20:11:04', '2026-08-02 20:11:04'),
(15, 6, 'CIMB', 'Bank', 5.00, 'USD', '#ff0000', 'wallet', 'active', '2026-08-02 22:05:27', '2026-08-02 22:05:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attachments_transaction_id_foreign` (`transaction_id`);

--
-- Indexes for table `budgets`
--
ALTER TABLE `budgets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `budgets_user_id_category_id_month_year_unique` (`user_id`,`category_id`,`month`,`year`),
  ADD KEY `budgets_category_id_foreign` (`category_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `currencies`
--
ALTER TABLE `currencies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `currencies_code_unique` (`code`);

--
-- Indexes for table `expense_categories`
--
ALTER TABLE `expense_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expense_categories_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `income_categories`
--
ALTER TABLE `income_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `income_categories_user_id_foreign` (`user_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_id_foreign` (`user_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_unique` (`name`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `permission_role_role_id_foreign` (`role_id`);

--
-- Indexes for table `recurring_transactions`
--
ALTER TABLE `recurring_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recurring_transactions_user_id_foreign` (`user_id`),
  ADD KEY `recurring_transactions_wallet_id_foreign` (`wallet_id`),
  ADD KEY `recurring_transactions_category_id_index` (`category_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indexes for table `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `role_user_role_id_foreign` (`role_id`);

--
-- Indexes for table `salaries`
--
ALTER TABLE `salaries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `salaries_user_id_month_year_currency_unique` (`user_id`,`month`,`year`,`currency`),
  ADD KEY `salaries_wallet_id_foreign` (`wallet_id`);

--
-- Indexes for table `savings_goals`
--
ALTER TABLE `savings_goals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `savings_goals_user_id_foreign` (`user_id`);

--
-- Indexes for table `saving_transactions`
--
ALTER TABLE `saving_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `saving_transactions_goal_id_foreign` (`goal_id`),
  ADD KEY `saving_transactions_wallet_id_foreign` (`wallet_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_user_id_unique` (`user_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tags_user_id_foreign` (`user_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transactions_user_id_foreign` (`user_id`),
  ADD KEY `transactions_wallet_id_foreign` (`wallet_id`),
  ADD KEY `transactions_category_id_index` (`category_id`);

--
-- Indexes for table `transaction_tags`
--
ALTER TABLE `transaction_tags`
  ADD PRIMARY KEY (`transaction_id`,`tag_id`),
  ADD KEY `transaction_tags_tag_id_foreign` (`tag_id`);

--
-- Indexes for table `transfers`
--
ALTER TABLE `transfers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transfers_user_id_foreign` (`user_id`),
  ADD KEY `transfers_from_wallet_id_foreign` (`from_wallet_id`),
  ADD KEY `transfers_to_wallet_id_foreign` (`to_wallet_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_google_id_unique` (`google_id`);

--
-- Indexes for table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wallets_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attachments`
--
ALTER TABLE `attachments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `budgets`
--
ALTER TABLE `budgets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `currencies`
--
ALTER TABLE `currencies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `expense_categories`
--
ALTER TABLE `expense_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `income_categories`
--
ALTER TABLE `income_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `recurring_transactions`
--
ALTER TABLE `recurring_transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `salaries`
--
ALTER TABLE `salaries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `savings_goals`
--
ALTER TABLE `savings_goals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `saving_transactions`
--
ALTER TABLE `saving_transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `transfers`
--
ALTER TABLE `transfers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attachments`
--
ALTER TABLE `attachments`
  ADD CONSTRAINT `attachments_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `budgets`
--
ALTER TABLE `budgets`
  ADD CONSTRAINT `budgets_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `expense_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `budgets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `expense_categories`
--
ALTER TABLE `expense_categories`
  ADD CONSTRAINT `expense_categories_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `income_categories`
--
ALTER TABLE `income_categories`
  ADD CONSTRAINT `income_categories_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `recurring_transactions`
--
ALTER TABLE `recurring_transactions`
  ADD CONSTRAINT `recurring_transactions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `recurring_transactions_wallet_id_foreign` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `salaries`
--
ALTER TABLE `salaries`
  ADD CONSTRAINT `salaries_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `salaries_wallet_id_foreign` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `savings_goals`
--
ALTER TABLE `savings_goals`
  ADD CONSTRAINT `savings_goals_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `saving_transactions`
--
ALTER TABLE `saving_transactions`
  ADD CONSTRAINT `saving_transactions_goal_id_foreign` FOREIGN KEY (`goal_id`) REFERENCES `savings_goals` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `saving_transactions_wallet_id_foreign` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `settings`
--
ALTER TABLE `settings`
  ADD CONSTRAINT `settings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tags`
--
ALTER TABLE `tags`
  ADD CONSTRAINT `tags_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transactions_wallet_id_foreign` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transaction_tags`
--
ALTER TABLE `transaction_tags`
  ADD CONSTRAINT `transaction_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transaction_tags_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transfers`
--
ALTER TABLE `transfers`
  ADD CONSTRAINT `transfers_from_wallet_id_foreign` FOREIGN KEY (`from_wallet_id`) REFERENCES `wallets` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transfers_to_wallet_id_foreign` FOREIGN KEY (`to_wallet_id`) REFERENCES `wallets` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transfers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wallets`
--
ALTER TABLE `wallets`
  ADD CONSTRAINT `wallets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
