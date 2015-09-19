-- phpMyAdmin SQL Dump
-- version 2.10.1
-- http://www.phpmyadmin.net
-- 
-- Host: localhost
-- Generation Time: Sep 15, 2015 at 02:33 PM
-- Server version: 5.0.45
-- PHP Version: 5.2.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- Database: `helixtdb`
-- 

-- --------------------------------------------------------

-- 
-- Table structure for table `actions`
-- 

CREATE TABLE `actions` (
  `Id` int(11) NOT NULL auto_increment,
  `Action` tinytext collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=43 ;

-- 
-- Dumping data for table `actions`
-- 

INSERT INTO `actions` (`Id`, `Action`) VALUES 
(1, 'Add User'),
(2, 'Update User'),
(3, 'Delete User'),
(4, 'Restore User'),
(5, 'Add Group'),
(6, 'Update Group'),
(7, 'Delete Group'),
(8, 'Add User to Group'),
(9, 'Remove User from Group'),
(10, 'Add Action to Group'),
(11, 'Remove Action from Group'),
(12, 'Add Language'),
(13, 'Update Language'),
(14, 'Delete Language'),
(15, 'Add Content Category'),
(16, 'Update Content Category'),
(17, 'Delete Content Category'),
(18, 'Add Content Type'),
(19, 'Update Content Type'),
(20, 'Delete Content Type'),
(21, 'Add Property'),
(22, 'Update Property'),
(23, 'Delete Property'),
(24, 'Add Content'),
(25, 'Update Content'),
(26, 'Delete Content'),
(27, 'Restore Content'),
(28, 'Add Content Property'),
(29, 'Update Content Property'),
(30, 'Delete Content Property'),
(31, 'Add Folder'),
(32, 'Update Folder'),
(33, 'Delete Folder'),
(34, 'Add Translation'),
(35, 'Update Translation'),
(36, 'Add Page'),
(37, 'Update Page'),
(38, 'Delete Page'),
(39, 'Restore Page'),
(40, 'Add Page Content'),
(41, 'Update Page Content'),
(42, 'Delete Page Content');

-- --------------------------------------------------------

-- 
-- Table structure for table `contentcategories`
-- 

CREATE TABLE `contentcategories` (
  `Id` tinyint(11) NOT NULL auto_increment,
  `Category` varchar(150) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- 
-- Dumping data for table `contentcategories`
-- 


-- --------------------------------------------------------

-- 
-- Table structure for table `contentproperties`
-- 

CREATE TABLE `contentproperties` (
  `Id` bigint(20) NOT NULL auto_increment,
  `ContentId` bigint(20) NOT NULL,
  `PropertyId` int(11) NOT NULL,
  `ValueDictionaryId` bigint(20) default NULL,
  `Value` varchar(200) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (`Id`),
  KEY `ContentId` (`ContentId`),
  KEY `PropertyId` (`PropertyId`),
  KEY `ValueDictionaryId` (`ValueDictionaryId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=139 ;

-- 
-- Dumping data for table `contentproperties`
-- 

INSERT INTO `contentproperties` (`Id`, `ContentId`, `PropertyId`, `ValueDictionaryId`, `Value`) VALUES 
(50, 8, 1, 222, NULL),
(51, 8, 2, NULL, 'image/jpeg'),
(52, 8, 5, NULL, '3F392C72D20DDCB6E320C5077A64EFA4.jpg'),
(53, 8, 6, NULL, 'http://localhost:8080/HelixT/media/3F392C72D20DDCB6E320C5077A64EFA4.jpg'),
(54, 8, 8, 223, NULL),
(55, 8, 9, NULL, '2'),
(56, 8, 12, NULL, '1508.7490234375 KB'),
(57, 9, 1, 224, NULL),
(58, 9, 2, NULL, 'image/jpeg'),
(59, 9, 5, NULL, 'CB4ACAF5EB87936EEFC04DB027CAC68A.jpg'),
(60, 9, 6, NULL, 'http://localhost:8080/HelixT/documents/CB4ACAF5EB87936EEFC04DB027CAC68A.jpg'),
(61, 9, 8, 225, NULL),
(62, 9, 9, NULL, '5'),
(63, 9, 12, NULL, '50.0078125 KB'),
(64, 10, 1, 226, NULL),
(65, 10, 2, NULL, 'image/jpeg'),
(66, 10, 5, NULL, '6F32B6C2B4F494C8D356C68AFB2289D7.jpg'),
(67, 10, 6, NULL, 'http://localhost:8080/HelixT/media/6F32B6C2B4F494C8D356C68AFB2289D7.jpg'),
(68, 10, 8, 227, NULL),
(69, 10, 9, NULL, '2'),
(70, 10, 12, NULL, '50.0078125 KB'),
(71, 11, 10, 238, NULL),
(72, 11, 13, 239, NULL),
(73, 11, 14, NULL, '2009-5-14'),
(74, 12, 15, 268, NULL),
(88, 19, 10, 298, NULL),
(89, 19, 13, 299, NULL),
(90, 19, 14, NULL, '2014-1-1'),
(95, 21, 16, 301, NULL),
(96, 21, 17, 222, NULL),
(97, 21, 18, 2, NULL),
(98, 21, 19, NULL, '43'),
(99, 21, 20, 302, NULL),
(117, 27, 16, 317, NULL),
(118, 27, 17, 223, NULL),
(119, 27, 18, 3, NULL),
(120, 27, 19, NULL, '100'),
(121, 27, 20, 318, NULL),
(122, 27, 21, NULL, '1'),
(123, 27, 22, NULL, '1999-07-04 03:00:01'),
(124, 27, 23, NULL, 'http://localhost:8080/HelixT/media/7EC12AB3605BAA43B3C96D783381A581.jpg'),
(132, 29, 1, 340, NULL),
(133, 29, 2, NULL, 'image/jpeg'),
(134, 29, 5, NULL, 'A2F8219CD56E02030A20907605077B2D.jpg'),
(135, 29, 6, NULL, 'http://localhost:8080/HelixT/media/test/A2F8219CD56E02030A20907605077B2D.jpg'),
(136, 29, 8, 341, NULL),
(137, 29, 9, NULL, '7'),
(138, 29, 12, NULL, '45.966796875 KB');

-- --------------------------------------------------------

-- 
-- Table structure for table `contents`
-- 

CREATE TABLE `contents` (
  `Id` bigint(20) NOT NULL auto_increment,
  `TypeId` tinyint(11) NOT NULL,
  `CategoryId` tinyint(11) default NULL,
  `ParentId` bigint(20) default NULL,
  `CreateDate` datetime NOT NULL,
  `CreateBy` int(11) NOT NULL,
  `EditDate` datetime default NULL,
  `EditBy` int(11) default NULL,
  `IsDeleted` tinyint(1) NOT NULL,
  `DeleteDate` datetime default NULL,
  `DeleteBy` int(11) default NULL,
  PRIMARY KEY  (`Id`),
  KEY `TypeId` (`TypeId`),
  KEY `CategoryId` (`CategoryId`),
  KEY `ParentId` (`ParentId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=30 ;

-- 
-- Dumping data for table `contents`
-- 

INSERT INTO `contents` (`Id`, `TypeId`, `CategoryId`, `ParentId`, `CreateDate`, `CreateBy`, `EditDate`, `EditBy`, `IsDeleted`, `DeleteDate`, `DeleteBy`) VALUES 
(8, 1, NULL, NULL, '2014-07-08 01:05:14', 1, '2014-07-12 15:58:57', 1, 0, NULL, NULL),
(9, 1, NULL, NULL, '2014-07-12 16:26:53', 1, NULL, NULL, 1, '2014-07-12 16:27:15', 1),
(10, 1, NULL, NULL, '2014-07-12 16:27:49', 1, NULL, NULL, 0, NULL, NULL),
(11, 2, NULL, NULL, '2014-07-16 13:37:34', 1, '2014-07-17 23:02:36', 1, 0, '2014-07-17 23:05:55', 1),
(12, 3, NULL, 11, '2014-07-25 14:40:41', 1, '2014-07-25 14:41:33', 1, 0, '2014-07-25 14:47:09', 1),
(19, 2, NULL, NULL, '2014-08-09 12:45:47', 1, NULL, NULL, 0, NULL, NULL),
(21, 4, NULL, NULL, '2014-08-09 13:20:38', 1, NULL, NULL, 1, '2014-08-16 16:07:31', 1),
(27, 4, NULL, NULL, '2014-08-16 11:17:37', 1, '2014-08-26 23:53:27', 1, 0, NULL, NULL),
(29, 1, NULL, NULL, '2014-08-26 23:06:21', 1, NULL, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

-- 
-- Table structure for table `contenttranslation`
-- 

CREATE TABLE `contenttranslation` (
  `Id` bigint(20) NOT NULL auto_increment,
  `TextId` bigint(20) NOT NULL,
  `LanguageId` tinyint(4) NOT NULL,
  `Translation` longtext collate utf8_unicode_ci NOT NULL,
  `TranslateDate` datetime default NULL,
  `TranslatedBy` int(11) default NULL,
  PRIMARY KEY  (`Id`),
  KEY `TextId` (`TextId`),
  KEY `LanguageId` (`LanguageId`),
  KEY `TranslatedBy` (`TranslatedBy`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=9 ;

-- 
-- Dumping data for table `contenttranslation`
-- 

INSERT INTO `contenttranslation` (`Id`, `TextId`, `LanguageId`, `Translation`, `TranslateDate`, `TranslatedBy`) VALUES 
(1, 239, 1, '<p><font face="Verdana" size="4">Sample</font></p><p align="center"><font color="#99ff00" face="Verdana" size="4">This is a test article!</font></p><ul><li><div align="left"><font color="#000000" face="Verdana" size="4">This is a test</font></div></li><li><div align="left"><font face="Verdana" size="4">This is a test</font></div></li></ul><font face="Verdana" size="4"><p align="left"><br></p><p align="left"><table width="100%" style="background: rgb(204, 255, 255); border: 1px solid rgb(0, 0, 0); border-image: none;" cellspacing="0" cellpadding="0"><tbody><tr><td style="background: rgb(204, 255, 255); border: 1px solid rgb(0, 0, 0); border-image: none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td><td style="background: rgb(204, 255, 255); border: 1px solid rgb(0, 0, 0); border-image: none;"><p align="center">&nbsp;Test</p></td></tr><tr><td style="background: rgb(204, 255, 255); border: 1px solid rgb(0, 0, 0); border-image: none;">&nbsp;</td><td style="background: rgb(204, 255, 255); border: 1px solid rgb(0, 0, 0); border-image: none;">&nbsp;</td></tr></tbody></table></p><p align="left"><br></p><p align="left"><font color="#000000"><br></font></p></font>', '2014-07-17 23:02:36', 1),
(2, 239, 2, '<p>إختبار</p><p><br></p><font face="Arial" size="3">2</font>', '2014-08-21 00:20:13', 1),
(4, 299, 1, '<p><font color="#000000" face="Arial" size="3">Test article content</font></p><p><font face="Arial" size="3"><br></font></p>', '2014-08-09 12:45:47', 1),
(5, 302, 1, '<p><font color="#000000" face="Arial" size="3">Content text </font></p><p><font face="Arial" size="3"><br></font></p>', '2014-08-09 13:20:38', 1),
(6, 318, 1, '<p><font color="#000000" face="Arial" size="3">Content</font></p><p><font face="Arial" size="3">text</font></p><p><font face="Arial" size="3"><br></font></p>', '2014-08-26 23:53:27', 1),
(7, 318, 3, '<p><font face="Arial" size="3">This is Content</font></p><p><font face="Arial" size="3">In Russian</font></p>', '2014-08-21 01:54:47', 1),
(8, 239, 3, '<p><font face="Arial" size="3">Russian</font></p><p><font face="Arial" size="3"><br></font></p>', '2014-08-21 01:57:14', 1);

-- --------------------------------------------------------

-- 
-- Table structure for table `contenttypes`
-- 

CREATE TABLE `contenttypes` (
  `Id` tinyint(11) NOT NULL auto_increment,
  `NameDictionaryId` bigint(20) NOT NULL,
  PRIMARY KEY  (`Id`),
  KEY `NameDictionaryId` (`NameDictionaryId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

-- 
-- Dumping data for table `contenttypes`
-- 

INSERT INTO `contenttypes` (`Id`, `NameDictionaryId`) VALUES 
(1, 167),
(2, 203),
(3, 252),
(4, 269),
(5, 344);

-- --------------------------------------------------------

-- 
-- Table structure for table `dictionary`
-- 

CREATE TABLE `dictionary` (
  `TextId` bigint(20) NOT NULL auto_increment,
  `Type` tinyint(1) NOT NULL,
  PRIMARY KEY  (`TextId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=346 ;

-- 
-- Dumping data for table `dictionary`
-- 

INSERT INTO `dictionary` (`TextId`, `Type`) VALUES 
(1, 0),
(2, 0),
(3, 0),
(4, 0),
(5, 0),
(6, 0),
(7, 0),
(8, 0),
(9, 0),
(10, 0),
(11, 0),
(12, 0),
(13, 0),
(14, 0),
(15, 0),
(16, 0),
(17, 0),
(18, 0),
(19, 0),
(20, 0),
(21, 0),
(22, 0),
(23, 0),
(24, 0),
(25, 0),
(26, 0),
(27, 0),
(28, 0),
(29, 0),
(30, 0),
(31, 0),
(32, 0),
(33, 0),
(34, 0),
(35, 0),
(36, 0),
(37, 0),
(38, 0),
(39, 0),
(40, 0),
(41, 0),
(42, 0),
(43, 0),
(44, 0),
(45, 0),
(46, 0),
(47, 0),
(48, 0),
(49, 0),
(50, 0),
(51, 0),
(52, 0),
(53, 0),
(54, 0),
(55, 0),
(56, 0),
(57, 0),
(58, 0),
(59, 0),
(60, 0),
(61, 0),
(62, 0),
(63, 0),
(64, 0),
(65, 0),
(66, 0),
(67, 0),
(68, 0),
(69, 0),
(70, 0),
(71, 0),
(72, 0),
(73, 0),
(74, 0),
(75, 0),
(76, 0),
(77, 0),
(78, 0),
(79, 0),
(80, 0),
(81, 0),
(82, 0),
(83, 0),
(84, 0),
(85, 0),
(86, 0),
(87, 0),
(88, 0),
(89, 0),
(90, 0),
(91, 0),
(92, 0),
(93, 0),
(94, 0),
(95, 0),
(96, 0),
(97, 0),
(98, 0),
(99, 0),
(100, 0),
(101, 0),
(102, 0),
(103, 0),
(104, 0),
(105, 0),
(106, 0),
(107, 0),
(108, 0),
(109, 0),
(110, 0),
(111, 0),
(112, 0),
(113, 0),
(114, 0),
(115, 0),
(116, 0),
(117, 0),
(118, 0),
(119, 0),
(120, 0),
(121, 0),
(122, 0),
(123, 0),
(124, 0),
(125, 0),
(126, 0),
(127, 0),
(128, 0),
(129, 0),
(130, 0),
(131, 0),
(132, 0),
(133, 0),
(134, 0),
(135, 0),
(136, 0),
(137, 0),
(138, 0),
(139, 0),
(140, 0),
(141, 0),
(142, 0),
(143, 0),
(144, 0),
(145, 0),
(146, 0),
(147, 0),
(148, 0),
(149, 0),
(150, 0),
(151, 0),
(152, 0),
(153, 0),
(154, 0),
(155, 0),
(156, 0),
(157, 0),
(158, 0),
(159, 0),
(160, 0),
(161, 0),
(162, 0),
(163, 0),
(164, 0),
(165, 0),
(166, 0),
(167, 0),
(168, 0),
(169, 0),
(170, 0),
(171, 0),
(172, 0),
(173, 0),
(174, 0),
(175, 0),
(176, 0),
(177, 0),
(178, 0),
(179, 0),
(180, 0),
(181, 0),
(182, 0),
(183, 0),
(184, 0),
(185, 0),
(186, 0),
(187, 0),
(188, 0),
(189, 0),
(190, 0),
(191, 0),
(192, 0),
(193, 0),
(194, 0),
(195, 0),
(196, 0),
(197, 0),
(198, 0),
(199, 0),
(200, 0),
(201, 0),
(202, 0),
(203, 0),
(204, 0),
(205, 0),
(206, 0),
(207, 0),
(208, 0),
(209, 0),
(210, 0),
(211, 0),
(212, 0),
(213, 0),
(214, 0),
(215, 0),
(216, 0),
(217, 0),
(218, 0),
(219, 0),
(220, 0),
(221, 0),
(222, 0),
(223, 0),
(224, 0),
(225, 0),
(226, 0),
(227, 0),
(228, 0),
(229, 0),
(230, 0),
(231, 0),
(232, 0),
(233, 0),
(234, 0),
(235, 0),
(236, 0),
(237, 0),
(238, 0),
(239, 0),
(240, 0),
(241, 0),
(242, 0),
(243, 0),
(244, 0),
(245, 0),
(246, 0),
(247, 0),
(248, 0),
(249, 0),
(250, 0),
(251, 0),
(252, 0),
(253, 0),
(254, 0),
(255, 0),
(256, 0),
(257, 0),
(258, 0),
(259, 0),
(260, 0),
(261, 0),
(262, 0),
(263, 0),
(264, 0),
(265, 0),
(266, 0),
(267, 0),
(268, 0),
(269, 0),
(270, 0),
(271, 0),
(272, 0),
(273, 0),
(274, 0),
(275, 0),
(276, 0),
(277, 0),
(278, 0),
(279, 0),
(280, 0),
(281, 0),
(282, 0),
(283, 0),
(284, 0),
(285, 0),
(286, 0),
(287, 0),
(288, 0),
(289, 0),
(290, 0),
(291, 0),
(292, 0),
(293, 0),
(294, 1),
(295, 0),
(296, 0),
(297, 0),
(298, 1),
(299, 1),
(300, 0),
(301, 0),
(302, 1),
(303, 0),
(304, 0),
(305, 0),
(306, 0),
(307, 1),
(308, 0),
(309, 0),
(310, 0),
(311, 0),
(317, 0),
(318, 1),
(319, 0),
(320, 0),
(321, 0),
(322, 0),
(323, 0),
(324, 0),
(325, 0),
(326, 0),
(327, 0),
(328, 0),
(329, 0),
(330, 0),
(331, 0),
(332, 0),
(333, 0),
(334, 0),
(335, 0),
(336, 0),
(337, 0),
(338, 0),
(339, 0),
(340, 0),
(341, 0),
(342, 0),
(343, 0),
(344, 0),
(345, 0);

-- --------------------------------------------------------

-- 
-- Table structure for table `folders`
-- 

CREATE TABLE `folders` (
  `Id` tinyint(4) NOT NULL auto_increment,
  `Name` varchar(50) collate utf8_unicode_ci NOT NULL,
  `ParentId` tinyint(4) default NULL,
  PRIMARY KEY  (`Id`),
  KEY `ParentId` (`ParentId`),
  KEY `Name` (`Name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=8 ;

-- 
-- Dumping data for table `folders`
-- 

INSERT INTO `folders` (`Id`, `Name`, `ParentId`) VALUES 
(1, 'Root', NULL),
(2, 'media', 1),
(5, 'documents', 1),
(6, 'other', 1),
(7, 'test', 2);

-- --------------------------------------------------------

-- 
-- Table structure for table `grouppermissions`
-- 

CREATE TABLE `grouppermissions` (
  `Id` int(11) NOT NULL auto_increment,
  `GroupId` tinyint(4) NOT NULL,
  `ActionId` int(11) NOT NULL,
  PRIMARY KEY  (`Id`),
  KEY `GroupId` (`GroupId`),
  KEY `ActionId` (`ActionId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=54 ;

-- 
-- Dumping data for table `grouppermissions`
-- 

INSERT INTO `grouppermissions` (`Id`, `GroupId`, `ActionId`) VALUES 
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 8),
(9, 1, 9),
(10, 1, 10),
(11, 1, 11),
(12, 1, 12),
(13, 1, 13),
(14, 1, 14),
(15, 1, 31),
(16, 1, 32),
(17, 1, 33),
(18, 2, 36),
(19, 2, 37),
(20, 2, 38),
(21, 2, 39),
(22, 2, 40),
(23, 2, 41),
(24, 2, 42),
(25, 3, 15),
(26, 3, 16),
(27, 3, 17),
(28, 3, 18),
(29, 3, 19),
(30, 3, 20),
(31, 3, 21),
(32, 3, 22),
(33, 3, 23),
(34, 3, 24),
(35, 3, 25),
(36, 3, 26),
(37, 3, 27),
(38, 3, 28),
(39, 3, 29),
(40, 3, 30),
(41, 4, 12),
(42, 4, 13),
(43, 4, 14),
(44, 4, 34),
(45, 4, 35),
(46, 3, 34),
(52, 5, 4),
(53, 5, 3);

-- --------------------------------------------------------

-- 
-- Table structure for table `groups`
-- 

CREATE TABLE `groups` (
  `Id` tinyint(4) NOT NULL auto_increment,
  `Name` varchar(50) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

-- 
-- Dumping data for table `groups`
-- 

INSERT INTO `groups` (`Id`, `Name`) VALUES 
(1, 'Administrators'),
(2, 'Designers'),
(3, 'Editors'),
(4, 'Translators'),
(5, 'Test Grouppp');

-- --------------------------------------------------------

-- 
-- Table structure for table `languages`
-- 

CREATE TABLE `languages` (
  `Id` tinyint(4) NOT NULL auto_increment,
  `Language` bigint(20) default NULL,
  `Code` varchar(2) collate utf8_unicode_ci NOT NULL,
  `Active` tinyint(1) NOT NULL,
  PRIMARY KEY  (`Id`),
  KEY `Language` (`Language`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

-- 
-- Dumping data for table `languages`
-- 

INSERT INTO `languages` (`Id`, `Language`, `Code`, `Active`) VALUES 
(1, 1, 'en', 1),
(2, 2, 'ar', 1),
(3, 3, 'ru', 1);

-- --------------------------------------------------------

-- 
-- Table structure for table `modules`
-- 

CREATE TABLE `modules` (
  `Id` int(11) NOT NULL auto_increment,
  `Name` varchar(50) collate utf8_unicode_ci NOT NULL,
  `Type` varchar(30) collate utf8_unicode_ci NOT NULL,
  `Description` text collate utf8_unicode_ci,
  PRIMARY KEY  (`Id`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- 
-- Dumping data for table `modules`
-- 


-- --------------------------------------------------------

-- 
-- Table structure for table `pagecontents`
-- 

CREATE TABLE `pagecontents` (
  `Id` bigint(20) NOT NULL auto_increment,
  `PageId` int(11) NOT NULL,
  `ContentId` bigint(20) NOT NULL,
  `Position` varchar(50) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`Id`),
  KEY `PageId` (`PageId`),
  KEY `ContentId` (`ContentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- 
-- Dumping data for table `pagecontents`
-- 


-- --------------------------------------------------------

-- 
-- Table structure for table `pages`
-- 

CREATE TABLE `pages` (
  `Id` int(11) NOT NULL auto_increment,
  `Title` bigint(20) NOT NULL,
  `FolderId` tinyint(4) NOT NULL,
  `BackColor` varchar(20) collate utf8_unicode_ci default NULL,
  `BackImage` varchar(100) collate utf8_unicode_ci default NULL,
  `CreateDate` date NOT NULL,
  `CreateBy` int(11) NOT NULL,
  `EditDate` date default NULL,
  `EditBy` int(11) default NULL,
  `IsDeleted` tinyint(1) NOT NULL,
  `DeleteDate` date default NULL,
  `DeleteBy` int(11) default NULL,
  PRIMARY KEY  (`Id`),
  KEY `FolderId` (`FolderId`),
  KEY `CreateBy` (`CreateBy`),
  KEY `EditBy` (`EditBy`),
  KEY `DeleteBy` (`DeleteBy`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- 
-- Dumping data for table `pages`
-- 


-- --------------------------------------------------------

-- 
-- Table structure for table `phrasetranslation`
-- 

CREATE TABLE `phrasetranslation` (
  `Id` bigint(20) NOT NULL auto_increment,
  `TextId` bigint(20) NOT NULL,
  `LanguageId` tinyint(4) NOT NULL,
  `Translation` varchar(100) collate utf8_unicode_ci NOT NULL,
  `TranslateDate` datetime default NULL,
  `TranslateBy` int(11) default NULL,
  PRIMARY KEY  (`Id`),
  KEY `LanguageId` (`LanguageId`),
  KEY `TextId` (`TextId`),
  KEY `TranslateBy` (`TranslateBy`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=350 ;

-- 
-- Dumping data for table `phrasetranslation`
-- 

INSERT INTO `phrasetranslation` (`Id`, `TextId`, `LanguageId`, `Translation`, `TranslateDate`, `TranslateBy`) VALUES 
(1, 1, 1, 'English', '2014-05-11 00:00:00', 1),
(2, 2, 1, 'Arabic', '2014-05-11 00:00:00', 1),
(3, 3, 1, 'Russian', '2014-05-16 00:00:00', 1),
(4, 1, 2, 'انكليزي', '2014-05-19 00:00:00', 1),
(5, 2, 2, 'عربي', '2014-05-19 00:00:00', 1),
(6, 3, 2, 'روسي', '2014-05-19 00:00:00', 1),
(7, 4, 1, 'Web Content Management System', '2014-05-19 00:00:00', 1),
(8, 4, 2, 'نظام إدارة محتوى الويب', '2014-05-19 00:00:00', 1),
(9, 5, 1, 'Ok', '2014-05-19 00:00:00', 1),
(10, 6, 1, 'Close', '2014-05-19 00:00:00', 1),
(11, 7, 1, 'Error', '2014-05-19 00:00:00', 1),
(12, 5, 2, 'موافق', '2014-05-19 00:00:00', 1),
(13, 6, 2, 'إغلاق', '2014-05-19 00:00:00', 1),
(14, 7, 2, 'خطأ', '2014-05-19 00:00:00', 1),
(15, 8, 1, 'Error getting session number', '2014-05-19 00:00:00', 1),
(16, 9, 1, 'Localization error', '2014-05-19 00:00:00', 1),
(17, 10, 1, 'Sign In', '2014-05-20 00:00:00', 1),
(18, 11, 1, 'Username', '2014-05-20 00:00:00', 1),
(19, 12, 1, 'Password', '2014-05-20 00:00:00', 1),
(20, 13, 1, 'Incorrect credentials', '2014-05-20 00:00:00', 1),
(21, 14, 1, 'Add Language', '2014-05-20 00:00:00', 1),
(22, 15, 1, 'Main Menu', '2014-05-20 00:00:00', 1),
(23, 16, 1, 'Translation Window', '2014-05-20 00:00:00', 1),
(24, 17, 1, 'Localization', '2014-05-20 00:00:00', 1),
(25, 18, 1, 'Language table', '2014-05-20 00:00:00', 1),
(26, 19, 1, 'Language', '2014-05-20 00:00:00', 1),
(27, 20, 1, 'Active', '2014-05-20 00:00:00', 1),
(28, 21, 1, 'Add', '2014-05-20 00:00:00', 1),
(29, 22, 1, 'Information', '2014-05-20 00:00:00', 1),
(30, 23, 1, 'New language has been added', '2014-05-20 00:00:00', 1),
(31, 24, 1, 'Error adding new language', '2014-05-20 00:00:00', 1),
(32, 25, 1, 'Language Name', '2014-05-20 00:00:00', 1),
(33, 26, 1, 'Language Code', '2014-05-20 00:00:00', 1),
(34, 27, 1, 'Change', '2014-05-20 00:00:00', 1),
(35, 28, 1, 'Edit Language', '2014-05-20 00:00:00', 1),
(36, 29, 1, 'Error editing language', '2014-05-20 00:00:00', 1),
(37, 30, 1, 'Language status has been changed', '2014-05-20 00:00:00', 1),
(38, 31, 1, 'No', '2014-05-20 00:00:00', 1),
(39, 32, 1, 'Yes', '2014-05-20 00:00:00', 1),
(40, 33, 1, 'Add Phrase', '2014-05-20 00:00:00', 1),
(41, 34, 1, 'Search By Template', '2014-05-20 00:00:00', 1),
(42, 35, 1, 'Case Sensitive', '2014-05-20 00:00:00', 1),
(43, 36, 1, 'Not Translated Only', '2014-05-20 00:00:00', 1),
(44, 37, 1, 'Search template', '2014-05-20 00:00:00', 1),
(45, 38, 1, 'Error getting language list', '2014-05-20 00:00:00', 1),
(46, 39, 1, 'From language', '2014-05-20 00:00:00', 1),
(47, 40, 1, 'To language', '2014-05-20 00:00:00', 1),
(48, 41, 1, 'Source phrase', '2014-05-20 00:00:00', 1),
(49, 42, 1, 'Translated phrase', '2014-05-20 00:00:00', 1),
(50, 43, 1, 'Phrase', '2014-05-20 00:00:00', 1),
(51, 44, 1, 'Add Phrase Window', '2014-05-20 00:00:00', 1),
(52, 45, 1, 'Error adding new phrase', '2014-05-20 00:00:00', 1),
(53, 46, 1, 'New phrase has been added', '2014-05-20 00:00:00', 1),
(54, 47, 1, 'Translate', '2014-05-20 00:00:00', 1),
(55, 48, 1, 'Phrase Translation', '2014-05-20 00:00:00', 1),
(56, 49, 1, 'Translation has been done', '2014-05-20 00:00:00', 1),
(57, 50, 1, 'Groups & Permissions', '2014-05-21 00:00:00', 1),
(58, 51, 1, 'Users', '2014-05-21 00:00:00', 1),
(59, 52, 1, 'Group Name', '2014-05-21 00:00:00', 1),
(60, 53, 1, 'Add Group', '2014-05-21 00:00:00', 1),
(61, 54, 1, 'Are you sure you want to add this group?', '2014-05-21 00:00:00', 1),
(62, 55, 1, 'Error adding group', '2014-05-21 00:00:00', 1),
(63, 56, 1, 'New group has been added', '2014-05-21 00:00:00', 1),
(64, 57, 1, 'Delete', '2014-05-21 00:00:00', 1),
(65, 58, 1, 'Remove', '2014-05-21 00:00:00', 1),
(66, 59, 1, 'Group Permissions', '2014-05-21 00:00:00', 1),
(67, 60, 1, 'Group Users', '2014-05-21 00:00:00', 1),
(68, 61, 1, 'Edit Group', '2014-05-21 00:00:00', 1),
(69, 62, 1, 'Error changing group', '2014-05-21 00:00:00', 1),
(70, 63, 1, 'Group has been changed', '2014-05-21 00:00:00', 1),
(71, 64, 1, 'Are you sure you want to change this group?', '2014-05-21 00:00:00', 1),
(72, 65, 1, 'Error deleting group. It may be used by other records.', '2014-05-21 00:00:00', 1),
(73, 66, 1, 'Group has been deleted', '2014-05-21 00:00:00', 1),
(74, 67, 1, 'Are you sure you want to delete this group?', '2014-05-21 00:00:00', 1),
(75, 68, 1, 'Error getting group', '2014-05-21 00:00:00', 1),
(76, 69, 1, 'Error removing user from group', '2014-05-21 00:00:00', 1),
(77, 70, 1, 'User removed from this group', '2014-05-21 00:00:00', 1),
(78, 71, 1, 'You must select a permission', '2014-05-21 00:00:00', 1),
(79, 72, 1, 'Permission', '2014-05-21 00:00:00', 1),
(80, 73, 1, 'Name', '2014-05-21 00:00:00', 1),
(81, 74, 1, 'Email', '2014-05-21 00:00:00', 1),
(82, 75, 1, 'Select Permission', '2014-05-21 00:00:00', 1),
(83, 76, 1, 'Error adding selected permission(s) to group', '2014-05-21 00:00:00', 1),
(84, 77, 1, 'Selected permissions have been added to group', '2014-05-21 00:00:00', 1),
(85, 78, 1, 'Are you sure you want to add selected permission(s) to group?', '2014-05-21 00:00:00', 1),
(86, 79, 1, 'Action', '2014-05-21 00:00:00', 1),
(87, 80, 1, 'Deleted Users', '2014-05-21 00:00:00', 1),
(88, 81, 1, 'Phone', '2014-05-21 00:00:00', 1),
(89, 82, 1, 'Last Access', '2014-05-21 00:00:00', 1),
(90, 83, 1, 'Add User', '2014-05-21 00:00:00', 1),
(91, 84, 1, 'Are you sure you want to add new user?', '2014-05-21 00:00:00', 1),
(92, 85, 1, 'Error adding user', '2014-05-21 00:00:00', 1),
(93, 86, 1, 'New user has been added', '2014-05-21 00:00:00', 1),
(94, 87, 1, 'Male', '2014-05-21 00:00:00', 1),
(95, 88, 1, 'Female', '2014-05-21 00:00:00', 1),
(96, 89, 1, 'Address', '2014-05-21 00:00:00', 1),
(97, 90, 1, 'Sex', '2014-05-21 00:00:00', 1),
(98, 91, 1, 'Restore', '2014-05-21 00:00:00', 1),
(99, 92, 1, 'Are you sure you want to restore this user?', '2014-05-21 00:00:00', 1),
(100, 93, 1, 'You must select a user', '2014-05-21 00:00:00', 1),
(101, 94, 1, 'Error restoring user', '2014-05-21 00:00:00', 1),
(102, 95, 1, 'User has been restored', '2014-05-21 00:00:00', 1),
(103, 96, 1, 'User Actions', '2014-05-21 00:00:00', 1),
(104, 97, 1, 'User Groups', '2014-05-21 00:00:00', 1),
(105, 98, 1, 'Edit User', '2014-05-21 00:00:00', 1),
(106, 99, 1, 'Error changing user', '2014-05-21 00:00:00', 1),
(107, 100, 1, 'User has been changed', '2014-05-21 00:00:00', 1),
(108, 101, 1, 'Are you sure you want to change this user?', '2014-05-21 00:00:00', 1),
(109, 102, 1, 'Error deleting user', '2014-05-21 00:00:00', 1),
(110, 103, 1, 'User has been deleted', '2014-05-21 00:00:00', 1),
(111, 104, 1, 'Are you sure you want to delete this user?', '2014-05-21 00:00:00', 1),
(112, 105, 1, 'Error getting user', '2014-05-21 00:00:00', 1),
(113, 106, 1, 'Error removing user from group', '2014-05-21 00:00:00', 1),
(114, 107, 1, 'User has been removed from this group', '2014-05-21 00:00:00', 1),
(115, 108, 1, 'You must select a group', '2014-05-21 00:00:00', 1),
(116, 109, 1, 'Date', '2014-05-21 00:00:00', 1),
(117, 110, 1, 'Select Group', '2014-05-21 00:00:00', 1),
(118, 111, 1, 'Error adding user to group(s)', '2014-05-21 00:00:00', 1),
(119, 112, 1, 'User has been added to selected group(s)', '2014-05-21 00:00:00', 1),
(120, 113, 1, 'Are you sure you want to add user to selected group(s)?', '2014-05-21 00:00:00', 1),
(121, 114, 1, 'Folders', '2014-05-24 00:00:00', 1),
(122, 115, 1, 'Folder Name', '2014-05-24 00:00:00', 1),
(123, 116, 1, 'Parent Folder', '2014-05-24 00:00:00', 1),
(124, 117, 1, 'Add Folder', '2014-05-24 00:00:00', 1),
(125, 118, 1, 'Are you sure you want to add this folder?', '2014-05-24 00:00:00', 1),
(126, 119, 1, 'Error adding folder', '2014-05-24 00:00:00', 1),
(127, 120, 1, 'New folder has been added ', '2014-05-24 00:00:00', 1),
(128, 121, 1, 'A folder with this name already exists', '2014-05-24 00:00:00', 1),
(129, 122, 1, 'Error getting folders list', '2014-05-24 00:00:00', 1),
(130, 123, 1, 'Edit Folder', '2014-05-24 00:00:00', 1),
(131, 124, 1, 'Error renaming folder', '2014-05-24 00:00:00', 1),
(132, 125, 1, 'Folder has been renamed', '2014-05-24 00:00:00', 1),
(133, 126, 1, 'A folder with this name already exists', '2014-05-24 00:00:00', 1),
(134, 127, 1, 'Are you sure you want to rename this folder?', '2014-05-24 00:00:00', 1),
(135, 128, 1, 'Are you sure you want to remove this folder?', '2014-05-24 00:00:00', 1),
(136, 129, 1, 'Error removing folder', '2014-05-24 00:00:00', 1),
(137, 130, 1, 'Folder has been removed', '2014-05-24 00:00:00', 1),
(138, 131, 1, 'Cannot remove folder because it has contents', '2014-05-24 00:00:00', 1),
(139, 132, 1, 'Error getting folder', '2014-05-24 00:00:00', 1),
(140, 133, 1, 'Add Property', '2014-05-26 00:00:00', 1),
(141, 134, 1, 'Entity Creator', '2014-05-26 00:00:00', 1),
(142, 135, 1, 'Property Name', '2014-05-26 00:00:00', 1),
(143, 136, 1, 'Property Value Type', '2014-05-26 00:00:00', 1),
(144, 137, 1, 'Properties', '2014-05-26 00:00:00', 1),
(145, 138, 1, 'Entity Name', '2014-05-26 00:00:00', 1),
(146, 139, 1, 'Add Entity Property', '2014-05-26 00:00:00', 1),
(147, 140, 1, 'Are you sure you want to add this entity property?', '2014-05-26 00:00:00', 1),
(148, 141, 1, 'Error adding entity property', '2014-05-26 00:00:00', 1),
(149, 142, 1, 'Entity property has been added', '2014-05-26 00:00:00', 1),
(150, 143, 1, 'Content Type :: Entity', '2014-05-27 00:00:00', 1),
(151, 144, 1, 'Are you sure you want to add this entity?', '2014-05-27 00:00:00', 1),
(152, 145, 1, 'Error adding entity', '2014-05-27 00:00:00', 1),
(153, 146, 1, 'New entity has been added', '2014-05-27 00:00:00', 1),
(154, 147, 1, 'Error getting entity', '2014-05-27 00:00:00', 1),
(155, 148, 1, 'Are you sure you want to change this entity?', '2014-05-27 00:00:00', 1),
(156, 149, 1, 'Error changing entity', '2014-05-27 00:00:00', 1),
(157, 150, 1, 'Entity has been changed', '2014-05-27 00:00:00', 1),
(158, 151, 1, 'Text', '2014-05-27 00:00:00', 1),
(159, 152, 1, 'HTML (Article)', '2014-05-27 00:00:00', 1),
(160, 153, 1, 'Number / Integer', '2014-05-27 00:00:00', 1),
(161, 154, 1, 'Number / Floating Point', '2014-05-27 00:00:00', 1),
(162, 155, 1, 'Date', '2014-05-27 00:00:00', 1),
(163, 156, 1, 'Date Time', '2014-05-27 00:00:00', 1),
(164, 157, 1, 'Boolean', '2014-05-27 00:00:00', 1),
(165, 158, 1, 'Edit Entity Property', '2014-05-27 00:00:00', 1),
(166, 159, 1, 'Error changing entity property', '2014-05-28 00:00:00', 1),
(167, 160, 1, 'Entity property has been changed', '2014-05-28 00:00:00', 1),
(168, 161, 1, 'Are you sure you want to change this entity property?', '2014-05-28 00:00:00', 1),
(169, 162, 1, 'Error deleting entity property', '2014-05-28 00:00:00', 1),
(170, 163, 1, 'Entity property has been deleted', '2014-05-28 00:00:00', 1),
(171, 164, 1, 'Cannot delete this entity property because it is in use', '2014-05-28 00:00:00', 1),
(172, 165, 1, 'Are you sure you want to delete this entity property?', '2014-05-28 00:00:00', 1),
(173, 166, 1, 'Content Types', '2014-05-28 00:00:00', 1),
(174, 167, 1, 'Media', '2014-05-28 00:00:00', 1),
(175, 169, 1, 'Random Number', '2014-05-29 00:00:00', 1),
(176, 170, 1, 'Unique Code', '2014-05-29 00:00:00', 1),
(177, 171, 1, 'URL', '2014-05-29 00:00:00', 1),
(178, 172, 1, 'Text Box', '2014-05-29 00:00:00', 1),
(179, 173, 1, 'HTML Editor', '2014-05-29 00:00:00', 1),
(180, 174, 1, 'Drop Down List', '2014-05-29 00:00:00', 1),
(181, 175, 1, 'Slider', '2014-05-29 00:00:00', 1),
(182, 176, 1, 'Check Box', '2014-05-29 00:00:00', 1),
(183, 177, 1, 'View Component', '2014-05-31 00:00:00', 1),
(184, 178, 1, 'Required', '2014-05-31 00:00:00', 1),
(185, 179, 1, 'Min Value', '2014-05-31 00:00:00', 1),
(186, 180, 1, 'Max Value', '2014-05-31 00:00:00', 1),
(187, 181, 1, 'Step', '2014-05-31 00:00:00', 1),
(188, 182, 1, 'Set values manually', '2014-05-31 00:00:00', 1),
(189, 183, 1, 'Set values from other property', '2014-05-31 00:00:00', 1),
(190, 184, 1, 'Enter values and seperate them by (;) like: (value1;value2;....valuen;)', '2014-05-31 00:00:00', 1),
(191, 185, 1, 'Source', '2014-05-31 00:00:00', 1),
(192, 186, 1, 'Error getting properties names', '2014-05-31 00:00:00', 1),
(193, 187, 1, 'Media Title', '2014-05-31 00:00:00', 1),
(196, 190, 1, 'Error getting entity property', '2014-06-01 00:00:00', 1),
(197, 191, 1, 'Select', '2014-06-04 00:00:00', 1),
(198, 192, 1, 'Image', '2014-06-06 00:00:00', 1),
(199, 193, 1, 'Audio', '2014-06-06 00:00:00', 1),
(200, 194, 1, 'Video', '2014-06-06 00:00:00', 1),
(201, 195, 1, 'Media Type', '2014-06-06 00:00:00', 1),
(204, 198, 1, 'Code', '2014-06-07 00:00:00', 1),
(205, 199, 1, 'Media URL', '2014-06-07 00:00:00', 1),
(207, 201, 1, 'Media Description', '2014-06-07 00:00:00', 1),
(208, 202, 1, 'Folder', '2014-06-08 00:00:00', 1),
(209, 203, 1, 'Article', '2014-06-08 00:00:00', 1),
(210, 204, 1, 'Article Title', '2014-06-08 00:00:00', 1),
(212, 206, 1, 'Media File Size', '2014-07-01 00:00:00', 1),
(213, 207, 1, 'Media Manager', '2014-07-07 00:00:00', 1),
(228, 222, 1, 'Lemon Plants', '2014-07-12 15:56:14', 1),
(229, 223, 1, 'Small lemon plants to be planted', '2014-07-12 15:56:14', 1),
(230, 222, 2, 'Lemon Plantss', '2014-07-12 15:58:57', 1),
(231, 223, 2, 'Small lemon plants to be planted', '2014-07-12 15:58:57', 1),
(232, 224, 1, 'Sun set', '2014-07-12 16:26:53', 1),
(233, 225, 1, 'Beautiful sun set between rocks', '2014-07-12 16:26:53', 1),
(234, 226, 1, 'Sun set', '2014-07-12 16:27:49', 1),
(235, 227, 1, 'Beautiful sun set between rocks', '2014-07-12 16:27:49', 1),
(236, 228, 1, 'Article Text', '2014-07-14 03:30:23', 1),
(237, 229, 1, 'Article Publish Date', '2014-07-14 03:35:44', 1),
(238, 230, 1, 'Author', '2014-07-15 22:09:30', 1),
(239, 231, 1, 'Articles', '2014-07-15 22:11:15', 1),
(240, 232, 1, 'Article title template', '2014-07-15 22:13:23', 1),
(241, 233, 1, 'Add Article', '2014-07-15 23:04:26', 1),
(242, 234, 1, 'Are you sure you want to add this article?', '2014-07-15 23:05:18', 1),
(243, 235, 1, 'Error adding new article', '2014-07-15 23:07:02', 1),
(244, 236, 1, 'New article has been added', '2014-07-15 23:09:32', 1),
(245, 237, 1, 'Articles Manager', '2014-07-15 23:24:55', 1),
(246, 238, 1, 'Test Articlee', '2014-07-17 23:02:36', 1),
(247, 240, 1, 'Edit Article', '2014-07-16 15:44:30', 1),
(248, 241, 1, 'Error changing article', '2014-07-16 16:02:42', 1),
(249, 242, 1, 'Article has been changed', '2014-07-16 16:03:26', 1),
(250, 243, 1, 'Are you sure you want to change this article?', '2014-07-16 16:05:51', 1),
(251, 244, 1, 'Error deleting article', '2014-07-16 16:06:53', 1),
(252, 245, 1, 'Article has been deleted', '2014-07-16 16:07:43', 1),
(253, 246, 1, 'Cannot delete this article because it is in use', '2014-07-16 16:08:54', 1),
(254, 247, 1, 'Are you sure you want to delete this article?', '2014-07-16 16:09:41', 1),
(255, 248, 1, 'Error getting article text', '2014-07-16 16:10:57', 1),
(256, 249, 1, 'Article Translation', '2014-07-19 14:36:54', 1),
(257, 250, 1, 'Error Translating Article', '2014-07-20 00:36:38', 1),
(258, 251, 1, 'Article has been translated', '2014-07-20 00:37:28', 1),
(259, 238, 2, 'مقالة إختبارية', '2014-08-21 00:20:13', 1),
(260, 252, 1, 'Comment', '2014-07-22 23:12:44', 1),
(261, 253, 1, 'Light Text Editor', '2014-07-22 23:19:29', 1),
(262, 254, 1, 'Comments', '2014-07-22 23:28:45', 1),
(263, 255, 1, 'Add Comment', '2014-07-23 00:02:58', 1),
(264, 256, 1, 'Are you sure you want to add this comment?', '2014-07-23 16:39:30', 1),
(265, 257, 1, 'Error adding comment', '2014-07-23 16:40:00', 1),
(266, 258, 1, 'New comment has been added', '2014-07-23 16:40:33', 1),
(267, 259, 1, 'Comment Text', '2014-07-25 14:00:00', 1),
(268, 260, 1, 'Edit Comment', '2014-07-25 14:00:25', 1),
(269, 261, 1, 'Error changing comment', '2014-07-25 14:02:33', 1),
(270, 262, 1, 'Comment has been changed', '2014-07-25 14:03:05', 1),
(271, 263, 1, 'Are you sure you want to change this comment?', '2014-07-25 14:04:12', 1),
(272, 264, 1, 'Error deleting comment', '2014-07-25 14:04:38', 1),
(273, 265, 1, 'Comment has been deleted', '2014-07-25 14:05:17', 1),
(274, 266, 1, 'Cannot delete this comment because it is in use', '2014-07-25 14:06:10', 1),
(275, 267, 1, 'Are you sure you want to delete this comment', '2014-07-25 14:06:38', 1),
(276, 268, 1, 'This is a test comments to view the prespective of it and the potintials of its use 1', '2014-07-25 14:41:33', 1),
(277, 269, 1, 'Test Entity', '2014-07-27 23:43:55', 1),
(278, 270, 1, 'Entity Title', '2014-07-27 23:43:55', 1),
(279, 271, 1, 'Contents', '2014-07-27 23:52:17', 1),
(280, 272, 1, 'Create date between', '2014-07-31 14:55:51', 1),
(281, 273, 1, 'And', '2014-07-31 14:56:32', 1),
(282, 274, 1, 'Content Title', '2014-07-31 15:15:42', 1),
(283, 275, 1, 'Editors', '2014-08-01 16:36:41', 1),
(284, 276, 1, 'Error getting editors list', '2014-08-01 16:54:43', 1),
(285, 277, 1, 'Error getting content types', '2014-08-01 16:56:43', 1),
(286, 278, 1, 'All', '2014-08-01 16:58:23', 1),
(287, 279, 1, 'Add Content', '2014-08-02 16:28:56', 1),
(288, 280, 1, 'Select type for the new content', '2014-08-02 16:33:55', 1),
(289, 281, 1, 'Error getting content type properties', '2014-08-02 18:55:06', 1),
(290, 282, 1, 'Are you sure you want to add this content?', '2014-08-07 20:33:17', 1),
(291, 283, 1, 'Error adding content', '2014-08-07 20:35:18', 1),
(292, 284, 1, 'New content has been added', '2014-08-07 23:36:04', 1),
(293, 285, 1, 'Contents Manager', '2014-08-08 14:32:27', 1),
(294, 286, 1, 'Content Type', '2014-08-08 14:50:39', 1),
(295, 287, 1, 'Created By', '2014-08-08 14:51:15', 1),
(296, 288, 1, 'Created Date', '2014-08-08 14:51:39', 1),
(297, 289, 1, 'Entity Drop Manual', '2014-08-08 20:07:30', 1),
(298, 290, 1, 'Entity Drop down auto', '2014-08-08 20:08:02', 1),
(299, 291, 1, 'Entity slider', '2014-08-08 20:08:28', 1),
(300, 292, 1, 'Entity html', '2014-08-08 20:08:45', 1),
(305, 298, 1, 'Test article 2', '2014-08-09 12:45:47', 1),
(307, 301, 1, 'Test entity title', '2014-08-09 13:20:38', 1),
(308, 303, 1, 'Test Check box', '2014-08-09 13:24:56', 1),
(309, 304, 1, 'Test date time', '2014-08-11 22:15:23', 1),
(310, 305, 1, 'Test file uploader', '2014-08-11 22:15:45', 1),
(312, 308, 1, 'Edit Content', '2014-08-12 14:59:48', 1),
(313, 309, 1, 'Are you sure you want to change this content?', '2014-08-14 00:23:09', 1),
(314, 310, 1, 'Error changing content', '2014-08-14 00:28:21', 1),
(315, 311, 1, 'Content has been changed', '2014-08-14 00:29:52', 1),
(321, 317, 1, 'rrr', '2014-08-26 23:53:27', 1),
(322, 319, 1, 'Are you sure you want to delete this content?', '2014-08-16 11:27:44', 1),
(323, 320, 1, 'Error deleting content', '2014-08-16 11:35:22', 1),
(324, 321, 1, 'Content has been deleted', '2014-08-16 11:36:56', 1),
(325, 322, 1, 'Cannot delete this content because it is in use', '2014-08-16 11:38:06', 1),
(326, 323, 1, 'Publish Date', '2014-08-16 15:38:29', 1),
(327, 324, 1, 'File Uploader', '2014-08-17 12:08:42', 1),
(328, 325, 1, 'Accepted file types', '2014-08-17 23:28:43', 1),
(329, 326, 1, 'PDF', '2014-08-19 21:17:41', 1),
(330, 327, 1, 'SWF', '2014-08-19 21:18:39', 1),
(331, 328, 1, 'CSS', '2014-08-19 21:19:07', 1),
(332, 329, 1, 'HTML', '2014-08-19 21:19:41', 1),
(333, 330, 1, 'XML', '2014-08-19 21:19:55', 1),
(334, 331, 1, 'Other', '2014-08-19 21:20:57', 1),
(335, 332, 1, 'Upload to', '2014-08-19 21:23:57', 1),
(336, 333, 1, 'Base', '2014-08-19 22:33:07', 1),
(337, 334, 1, 'Multi Choice', '2014-08-19 22:38:34', 1),
(338, 238, 3, 'Test articlee in Russian', '2014-08-21 01:57:14', 1),
(339, 335, 1, 'Helix T :: Main Menu', '2014-08-23 16:14:37', 1),
(340, 336, 1, 'Styles', '2014-08-25 23:48:05', 1),
(341, 337, 1, 'Style Name', '2014-08-25 23:48:40', 1),
(344, 340, 1, 'Test upload', '2014-08-26 23:06:21', 1),
(345, 341, 1, 'Desc', '2014-08-26 23:06:21', 1),
(347, 343, 1, 'Test Randoom Base', '2014-08-30 20:19:23', 1),
(348, 344, 1, 'Book', '2014-09-04 14:57:02', 1),
(349, 345, 1, 'url', '2014-09-04 14:58:53', 1);

-- --------------------------------------------------------

-- 
-- Table structure for table `properties`
-- 

CREATE TABLE `properties` (
  `Id` int(11) NOT NULL auto_increment,
  `NameDictionaryId` bigint(20) NOT NULL,
  `ValueType` bigint(20) NOT NULL,
  `ContentTypeId` tinyint(4) NOT NULL,
  `ViewComponent` bigint(20) NOT NULL,
  `ValueDescription` varchar(250) collate utf8_unicode_ci default NULL,
  `Required` tinyint(1) NOT NULL,
  PRIMARY KEY  (`Id`),
  KEY `NameDictionaryId` (`NameDictionaryId`),
  KEY `ContentType` (`ContentTypeId`),
  KEY `ValueType` (`ValueType`),
  KEY `ViewComponent` (`ViewComponent`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=28 ;

-- 
-- Dumping data for table `properties`
-- 

INSERT INTO `properties` (`Id`, `NameDictionaryId`, `ValueType`, `ContentTypeId`, `ViewComponent`, `ValueDescription`, `Required`) VALUES 
(1, 187, 151, 1, 172, '', 1),
(2, 195, 151, 1, 174, '<Type>Manual</Type><Value>192</Value><Value>193</Value><Value>194</Value>', 1),
(5, 198, 170, 1, 172, '', 1),
(6, 199, 151, 1, 172, '', 1),
(8, 201, 151, 1, 172, '', 1),
(9, 202, 151, 1, 174, '<Type>Auto</Type><Value>folder</Value>', 1),
(10, 204, 151, 2, 172, '', 1),
(12, 206, 151, 1, 172, '', 1),
(13, 228, 152, 2, 173, '', 1),
(14, 229, 155, 2, 174, '', 1),
(15, 259, 151, 3, 172, '', 1),
(16, 270, 151, 4, 172, '', 1),
(17, 289, 151, 4, 174, '<Type>Manual</Type><Value>9</Value><Value>222</Value><Value>223</Value>', 1),
(18, 290, 151, 4, 174, '<Type>Auto</Type><Value>language</Value>', 1),
(19, 291, 153, 4, 175, '<MinValue>0</MinValue><MaxValue>100</MaxValue><Step>1</Step>', 1),
(20, 292, 152, 4, 173, '', 1),
(21, 303, 157, 4, 176, '', 1),
(22, 304, 156, 4, 174, '', 1),
(23, 305, 171, 4, 324, '<Accept>image/*</Accept><Folder>2</Folder>', 1),
(25, 343, 169, 4, 172, '<Base>1000000</Base>', 1),
(26, 270, 151, 5, 172, '', 1),
(27, 345, 171, 5, 324, '<Accept>application/pdf,text/html</Accept><Folder>5</Folder>', 1);

-- --------------------------------------------------------

-- 
-- Table structure for table `styles`
-- 

CREATE TABLE `styles` (
  `Id` int(11) NOT NULL auto_increment,
  `Name` varchar(50) collate utf8_unicode_ci NOT NULL,
  `Description` text collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`Id`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- 
-- Dumping data for table `styles`
-- 


-- --------------------------------------------------------

-- 
-- Table structure for table `useractions`
-- 

CREATE TABLE `useractions` (
  `Id` bigint(20) NOT NULL auto_increment,
  `ActionId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  PRIMARY KEY  (`Id`),
  KEY `ActionId` (`ActionId`),
  KEY `UserId` (`UserId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=662 ;

-- 
-- Dumping data for table `useractions`
-- 

INSERT INTO `useractions` (`Id`, `ActionId`, `UserId`, `Date`) VALUES 
(1, 1, 1, '0000-00-00 00:00:00'),
(4, 8, 1, '2014-05-15 00:00:00'),
(5, 8, 1, '2014-05-15 00:00:00'),
(6, 8, 1, '2014-05-15 00:00:00'),
(7, 8, 1, '2014-05-15 00:00:00'),
(8, 9, 1, '2014-05-15 00:00:00'),
(9, 8, 1, '2014-05-15 00:00:00'),
(10, 9, 1, '2014-05-15 00:00:00'),
(11, 2, 1, '2014-05-15 00:00:00'),
(12, 3, 1, '2014-05-15 00:00:00'),
(13, 4, 1, '2014-05-15 00:00:00'),
(14, 5, 1, '2014-05-15 00:00:00'),
(15, 5, 1, '2014-05-15 00:00:00'),
(16, 5, 1, '2014-05-15 00:00:00'),
(17, 5, 1, '2014-05-15 00:00:00'),
(18, 5, 1, '2014-05-16 00:00:00'),
(19, 5, 1, '2014-05-16 00:00:00'),
(20, 7, 1, '2014-05-16 00:00:00'),
(21, 5, 1, '2014-05-16 00:00:00'),
(22, 5, 1, '2014-05-16 00:00:00'),
(23, 6, 1, '2014-05-16 00:00:00'),
(24, 6, 1, '2014-05-16 00:00:00'),
(25, 6, 1, '2014-05-16 00:00:00'),
(26, 7, 1, '2014-05-16 00:00:00'),
(27, 8, 1, '2014-05-16 00:00:00'),
(28, 10, 1, '2014-05-16 00:00:00'),
(29, 10, 1, '2014-05-16 00:00:00'),
(30, 9, 1, '2014-05-16 00:00:00'),
(31, 8, 1, '2014-05-16 00:00:00'),
(32, 10, 1, '2014-05-16 00:00:00'),
(33, 8, 1, '2014-05-16 00:00:00'),
(34, 9, 1, '2014-05-16 00:00:00'),
(35, 10, 1, '2014-05-16 00:00:00'),
(36, 10, 1, '2014-05-16 00:00:00'),
(37, 10, 1, '2014-05-17 00:00:00'),
(38, 10, 1, '2014-05-17 00:00:00'),
(39, 10, 1, '2014-05-17 00:00:00'),
(40, 10, 1, '2014-05-17 00:00:00'),
(41, 10, 1, '2014-05-17 00:00:00'),
(42, 10, 1, '2014-05-17 00:00:00'),
(43, 11, 1, '2014-05-17 00:00:00'),
(44, 10, 1, '2014-05-17 00:00:00'),
(45, 11, 1, '2014-05-17 00:00:00'),
(46, 11, 1, '2014-05-17 00:00:00'),
(47, 11, 1, '2014-05-17 00:00:00'),
(48, 10, 1, '2014-05-17 00:00:00'),
(49, 11, 1, '2014-05-17 00:00:00'),
(50, 10, 1, '2014-05-17 00:00:00'),
(51, 8, 1, '2014-05-17 00:00:00'),
(52, 9, 1, '2014-05-17 00:00:00'),
(53, 34, 1, '2014-05-19 00:00:00'),
(54, 34, 1, '2014-05-19 00:00:00'),
(55, 34, 1, '2014-05-19 00:00:00'),
(56, 34, 1, '2014-05-19 00:00:00'),
(57, 34, 1, '2014-05-19 00:00:00'),
(58, 34, 1, '2014-05-19 00:00:00'),
(59, 34, 1, '2014-05-19 00:00:00'),
(60, 34, 1, '2014-05-19 00:00:00'),
(61, 34, 1, '2014-05-19 00:00:00'),
(62, 34, 1, '2014-05-19 00:00:00'),
(63, 34, 1, '2014-05-19 00:00:00'),
(64, 34, 1, '2014-05-19 00:00:00'),
(65, 34, 1, '2014-05-19 00:00:00'),
(66, 34, 1, '2014-05-19 00:00:00'),
(67, 34, 1, '2014-05-20 00:00:00'),
(68, 34, 1, '2014-05-20 00:00:00'),
(69, 34, 1, '2014-05-20 00:00:00'),
(70, 34, 1, '2014-05-20 00:00:00'),
(71, 34, 1, '2014-05-20 00:00:00'),
(72, 34, 1, '2014-05-20 00:00:00'),
(73, 34, 1, '2014-05-20 00:00:00'),
(74, 34, 1, '2014-05-20 00:00:00'),
(75, 34, 1, '2014-05-20 00:00:00'),
(76, 34, 1, '2014-05-20 00:00:00'),
(77, 34, 1, '2014-05-20 00:00:00'),
(78, 34, 1, '2014-05-20 00:00:00'),
(79, 34, 1, '2014-05-20 00:00:00'),
(80, 34, 1, '2014-05-20 00:00:00'),
(81, 34, 1, '2014-05-20 00:00:00'),
(82, 34, 1, '2014-05-20 00:00:00'),
(83, 34, 1, '2014-05-20 00:00:00'),
(84, 34, 1, '2014-05-20 00:00:00'),
(85, 34, 1, '2014-05-20 00:00:00'),
(86, 34, 1, '2014-05-20 00:00:00'),
(87, 34, 1, '2014-05-20 00:00:00'),
(88, 34, 1, '2014-05-20 00:00:00'),
(89, 34, 1, '2014-05-20 00:00:00'),
(90, 34, 1, '2014-05-20 00:00:00'),
(91, 34, 1, '2014-05-20 00:00:00'),
(92, 34, 1, '2014-05-20 00:00:00'),
(93, 34, 1, '2014-05-20 00:00:00'),
(94, 34, 1, '2014-05-20 00:00:00'),
(95, 34, 1, '2014-05-20 00:00:00'),
(96, 34, 1, '2014-05-20 00:00:00'),
(97, 34, 1, '2014-05-20 00:00:00'),
(98, 34, 1, '2014-05-20 00:00:00'),
(99, 34, 1, '2014-05-20 00:00:00'),
(100, 34, 1, '2014-05-20 00:00:00'),
(101, 34, 1, '2014-05-20 00:00:00'),
(102, 34, 1, '2014-05-20 00:00:00'),
(103, 34, 1, '2014-05-20 00:00:00'),
(104, 34, 1, '2014-05-20 00:00:00'),
(105, 34, 1, '2014-05-20 00:00:00'),
(106, 34, 1, '2014-05-20 00:00:00'),
(107, 34, 1, '2014-05-21 00:00:00'),
(108, 34, 1, '2014-05-21 00:00:00'),
(109, 34, 1, '2014-05-21 00:00:00'),
(110, 34, 1, '2014-05-21 00:00:00'),
(111, 34, 1, '2014-05-21 00:00:00'),
(112, 34, 1, '2014-05-21 00:00:00'),
(113, 34, 1, '2014-05-21 00:00:00'),
(114, 34, 1, '2014-05-21 00:00:00'),
(115, 34, 1, '2014-05-21 00:00:00'),
(116, 34, 1, '2014-05-21 00:00:00'),
(117, 34, 1, '2014-05-21 00:00:00'),
(118, 34, 1, '2014-05-21 00:00:00'),
(119, 34, 1, '2014-05-21 00:00:00'),
(120, 34, 1, '2014-05-21 00:00:00'),
(121, 34, 1, '2014-05-21 00:00:00'),
(122, 34, 1, '2014-05-21 00:00:00'),
(123, 34, 1, '2014-05-21 00:00:00'),
(124, 34, 1, '2014-05-21 00:00:00'),
(125, 34, 1, '2014-05-21 00:00:00'),
(126, 34, 1, '2014-05-21 00:00:00'),
(127, 34, 1, '2014-05-21 00:00:00'),
(128, 34, 1, '2014-05-21 00:00:00'),
(129, 34, 1, '2014-05-21 00:00:00'),
(130, 34, 1, '2014-05-21 00:00:00'),
(131, 34, 1, '2014-05-21 00:00:00'),
(132, 34, 1, '2014-05-21 00:00:00'),
(133, 34, 1, '2014-05-21 00:00:00'),
(134, 34, 1, '2014-05-21 00:00:00'),
(135, 34, 1, '2014-05-21 00:00:00'),
(136, 34, 1, '2014-05-21 00:00:00'),
(137, 34, 1, '2014-05-21 00:00:00'),
(138, 34, 1, '2014-05-21 00:00:00'),
(139, 34, 1, '2014-05-21 00:00:00'),
(140, 34, 1, '2014-05-21 00:00:00'),
(141, 34, 1, '2014-05-21 00:00:00'),
(142, 34, 1, '2014-05-21 00:00:00'),
(143, 34, 1, '2014-05-21 00:00:00'),
(144, 34, 1, '2014-05-21 00:00:00'),
(145, 34, 1, '2014-05-21 00:00:00'),
(146, 34, 1, '2014-05-21 00:00:00'),
(147, 34, 1, '2014-05-21 00:00:00'),
(148, 34, 1, '2014-05-21 00:00:00'),
(149, 34, 1, '2014-05-21 00:00:00'),
(150, 34, 1, '2014-05-21 00:00:00'),
(151, 34, 1, '2014-05-21 00:00:00'),
(152, 34, 1, '2014-05-21 00:00:00'),
(153, 34, 1, '2014-05-21 00:00:00'),
(154, 34, 1, '2014-05-21 00:00:00'),
(155, 34, 1, '2014-05-21 00:00:00'),
(156, 34, 1, '2014-05-21 00:00:00'),
(157, 34, 1, '2014-05-21 00:00:00'),
(158, 34, 1, '2014-05-21 00:00:00'),
(159, 34, 1, '2014-05-21 00:00:00'),
(160, 34, 1, '2014-05-21 00:00:00'),
(161, 34, 1, '2014-05-21 00:00:00'),
(162, 34, 1, '2014-05-21 00:00:00'),
(163, 34, 1, '2014-05-21 00:00:00'),
(164, 34, 1, '2014-05-21 00:00:00'),
(165, 34, 1, '2014-05-21 00:00:00'),
(166, 34, 1, '2014-05-21 00:00:00'),
(167, 34, 1, '2014-05-21 00:00:00'),
(168, 34, 1, '2014-05-21 00:00:00'),
(169, 34, 1, '2014-05-21 00:00:00'),
(170, 34, 1, '2014-05-21 00:00:00'),
(171, 34, 1, '2014-05-24 00:00:00'),
(172, 34, 1, '2014-05-24 00:00:00'),
(173, 34, 1, '2014-05-24 00:00:00'),
(174, 34, 1, '2014-05-24 00:00:00'),
(175, 34, 1, '2014-05-24 00:00:00'),
(176, 34, 1, '2014-05-24 00:00:00'),
(177, 34, 1, '2014-05-24 00:00:00'),
(178, 34, 1, '2014-05-24 00:00:00'),
(179, 34, 1, '2014-05-24 00:00:00'),
(180, 31, 1, '2014-05-24 00:00:00'),
(181, 31, 1, '2014-05-24 00:00:00'),
(182, 31, 1, '2014-05-24 00:00:00'),
(183, 34, 1, '2014-05-24 00:00:00'),
(184, 34, 1, '2014-05-24 00:00:00'),
(185, 34, 1, '2014-05-24 00:00:00'),
(186, 34, 1, '2014-05-24 00:00:00'),
(187, 34, 1, '2014-05-24 00:00:00'),
(188, 34, 1, '2014-05-24 00:00:00'),
(189, 34, 1, '2014-05-24 00:00:00'),
(190, 34, 1, '2014-05-24 00:00:00'),
(191, 34, 1, '2014-05-24 00:00:00'),
(192, 34, 1, '2014-05-24 00:00:00'),
(193, 32, 1, '2014-05-24 00:00:00'),
(194, 33, 1, '2014-05-24 00:00:00'),
(195, 34, 1, '2014-05-26 00:00:00'),
(196, 34, 1, '2014-05-26 00:00:00'),
(197, 34, 1, '2014-05-26 00:00:00'),
(198, 34, 1, '2014-05-26 00:00:00'),
(199, 34, 1, '2014-05-26 00:00:00'),
(200, 34, 1, '2014-05-26 00:00:00'),
(201, 34, 1, '2014-05-26 00:00:00'),
(202, 34, 1, '2014-05-26 00:00:00'),
(203, 34, 1, '2014-05-26 00:00:00'),
(204, 34, 1, '2014-05-26 00:00:00'),
(205, 34, 1, '2014-05-27 00:00:00'),
(206, 34, 1, '2014-05-27 00:00:00'),
(207, 34, 1, '2014-05-27 00:00:00'),
(208, 34, 1, '2014-05-27 00:00:00'),
(209, 34, 1, '2014-05-27 00:00:00'),
(210, 34, 1, '2014-05-27 00:00:00'),
(211, 34, 1, '2014-05-27 00:00:00'),
(212, 34, 1, '2014-05-27 00:00:00'),
(213, 34, 1, '2014-05-27 00:00:00'),
(214, 34, 1, '2014-05-27 00:00:00'),
(215, 34, 1, '2014-05-27 00:00:00'),
(216, 34, 1, '2014-05-27 00:00:00'),
(217, 34, 1, '2014-05-27 00:00:00'),
(218, 34, 1, '2014-05-27 00:00:00'),
(219, 34, 1, '2014-05-27 00:00:00'),
(220, 34, 1, '2014-05-27 00:00:00'),
(221, 34, 1, '2014-05-28 00:00:00'),
(222, 34, 1, '2014-05-28 00:00:00'),
(223, 34, 1, '2014-05-28 00:00:00'),
(224, 34, 1, '2014-05-28 00:00:00'),
(225, 34, 1, '2014-05-28 00:00:00'),
(226, 34, 1, '2014-05-28 00:00:00'),
(227, 34, 1, '2014-05-28 00:00:00'),
(228, 34, 1, '2014-05-28 00:00:00'),
(229, 18, 1, '2014-05-28 00:00:00'),
(230, 21, 1, '2014-05-28 00:00:00'),
(231, 19, 1, '2014-05-28 00:00:00'),
(232, 19, 1, '2014-05-28 00:00:00'),
(233, 23, 1, '2014-05-28 00:00:00'),
(234, 34, 1, '2014-05-29 00:00:00'),
(235, 34, 1, '2014-05-29 00:00:00'),
(236, 34, 1, '2014-05-29 00:00:00'),
(237, 34, 1, '2014-05-29 00:00:00'),
(238, 34, 1, '2014-05-29 00:00:00'),
(239, 34, 1, '2014-05-29 00:00:00'),
(240, 34, 1, '2014-05-29 00:00:00'),
(241, 34, 1, '2014-05-29 00:00:00'),
(242, 34, 1, '2014-05-31 00:00:00'),
(243, 34, 1, '2014-05-31 00:00:00'),
(244, 34, 1, '2014-05-31 00:00:00'),
(245, 34, 1, '2014-05-31 00:00:00'),
(246, 34, 1, '2014-05-31 00:00:00'),
(247, 34, 1, '2014-05-31 00:00:00'),
(248, 34, 1, '2014-05-31 00:00:00'),
(249, 34, 1, '2014-05-31 00:00:00'),
(250, 34, 1, '2014-05-31 00:00:00'),
(251, 34, 1, '2014-05-31 00:00:00'),
(252, 21, 1, '2014-05-31 00:00:00'),
(253, 21, 1, '2014-05-31 00:00:00'),
(254, 23, 1, '2014-06-01 00:00:00'),
(255, 21, 1, '2014-06-01 00:00:00'),
(256, 34, 1, '2014-06-01 00:00:00'),
(257, 23, 1, '2014-06-02 00:00:00'),
(258, 34, 1, '2014-06-04 00:00:00'),
(259, 34, 1, '2014-06-06 00:00:00'),
(260, 34, 1, '2014-06-06 00:00:00'),
(261, 34, 1, '2014-06-06 00:00:00'),
(262, 21, 1, '2014-06-06 00:00:00'),
(263, 21, 1, '2014-06-07 00:00:00'),
(264, 23, 1, '2014-06-07 00:00:00'),
(265, 21, 1, '2014-06-07 00:00:00'),
(266, 23, 1, '2014-06-07 00:00:00'),
(267, 21, 1, '2014-06-07 00:00:00'),
(268, 21, 1, '2014-06-07 00:00:00'),
(269, 21, 1, '2014-06-07 00:00:00'),
(270, 23, 1, '2014-06-07 00:00:00'),
(271, 22, 1, '2014-06-07 00:00:00'),
(272, 22, 1, '2014-06-07 00:00:00'),
(273, 21, 1, '2014-06-07 00:00:00'),
(274, 21, 1, '2014-06-08 00:00:00'),
(275, 18, 1, '2014-06-08 00:00:00'),
(276, 21, 1, '2014-06-08 00:00:00'),
(277, 21, 1, '2014-07-01 00:00:00'),
(278, 23, 1, '2014-07-01 00:00:00'),
(279, 21, 1, '2014-07-01 00:00:00'),
(280, 34, 1, '2014-07-07 00:00:00'),
(281, 10, 1, '2014-07-07 15:09:13'),
(282, 10, 1, '2014-07-07 15:09:28'),
(283, 28, 1, '2014-07-08 00:31:07'),
(284, 28, 1, '2014-07-08 00:31:07'),
(285, 28, 1, '2014-07-08 00:31:07'),
(286, 28, 1, '2014-07-08 00:31:07'),
(287, 28, 1, '2014-07-08 00:31:07'),
(288, 28, 1, '2014-07-08 00:31:07'),
(289, 28, 1, '2014-07-08 00:31:07'),
(290, 24, 1, '2014-07-08 00:31:07'),
(291, 28, 1, '2014-07-08 00:39:19'),
(292, 28, 1, '2014-07-08 00:39:19'),
(293, 28, 1, '2014-07-08 00:39:19'),
(294, 28, 1, '2014-07-08 00:39:19'),
(295, 28, 1, '2014-07-08 00:39:19'),
(296, 28, 1, '2014-07-08 00:39:19'),
(297, 28, 1, '2014-07-08 00:39:19'),
(298, 24, 1, '2014-07-08 00:39:19'),
(299, 28, 1, '2014-07-08 00:40:50'),
(300, 28, 1, '2014-07-08 00:40:50'),
(301, 28, 1, '2014-07-08 00:40:50'),
(302, 28, 1, '2014-07-08 00:40:50'),
(303, 28, 1, '2014-07-08 00:40:50'),
(304, 28, 1, '2014-07-08 00:40:50'),
(305, 28, 1, '2014-07-08 00:40:50'),
(306, 24, 1, '2014-07-08 00:40:50'),
(307, 28, 1, '2014-07-08 00:43:43'),
(308, 28, 1, '2014-07-08 00:43:43'),
(309, 28, 1, '2014-07-08 00:43:43'),
(310, 28, 1, '2014-07-08 00:43:43'),
(311, 28, 1, '2014-07-08 00:43:43'),
(312, 28, 1, '2014-07-08 00:43:43'),
(313, 28, 1, '2014-07-08 00:43:43'),
(314, 24, 1, '2014-07-08 00:43:43'),
(315, 28, 1, '2014-07-08 00:47:53'),
(316, 28, 1, '2014-07-08 00:47:53'),
(317, 28, 1, '2014-07-08 00:47:53'),
(318, 28, 1, '2014-07-08 00:47:53'),
(319, 28, 1, '2014-07-08 00:47:53'),
(320, 28, 1, '2014-07-08 00:47:53'),
(321, 28, 1, '2014-07-08 00:47:53'),
(322, 24, 1, '2014-07-08 00:47:53'),
(323, 28, 1, '2014-07-08 00:49:39'),
(324, 28, 1, '2014-07-08 00:49:39'),
(325, 28, 1, '2014-07-08 00:49:39'),
(326, 28, 1, '2014-07-08 00:49:39'),
(327, 28, 1, '2014-07-08 00:49:39'),
(328, 28, 1, '2014-07-08 00:49:39'),
(329, 28, 1, '2014-07-08 00:49:39'),
(330, 24, 1, '2014-07-08 00:49:39'),
(331, 28, 1, '2014-07-08 00:51:26'),
(332, 28, 1, '2014-07-08 00:51:26'),
(333, 28, 1, '2014-07-08 00:51:26'),
(334, 28, 1, '2014-07-08 00:51:26'),
(335, 28, 1, '2014-07-08 00:51:26'),
(336, 28, 1, '2014-07-08 00:51:26'),
(337, 28, 1, '2014-07-08 00:51:26'),
(338, 24, 1, '2014-07-08 00:51:26'),
(339, 28, 1, '2014-07-08 01:05:14'),
(340, 28, 1, '2014-07-08 01:05:14'),
(341, 28, 1, '2014-07-08 01:05:14'),
(342, 28, 1, '2014-07-08 01:05:14'),
(343, 28, 1, '2014-07-08 01:05:14'),
(344, 28, 1, '2014-07-08 01:05:14'),
(345, 28, 1, '2014-07-08 01:05:14'),
(346, 24, 1, '2014-07-08 01:05:14'),
(347, 26, 1, '2014-07-08 01:06:02'),
(348, 3, 1, '2014-07-08 20:57:43'),
(349, 4, 1, '2014-07-08 20:57:50'),
(350, 26, 1, '2014-07-08 20:59:50'),
(351, 26, 1, '2014-07-08 21:11:24'),
(352, 34, 1, '2014-07-08 21:56:51'),
(353, 34, 1, '2014-07-08 21:56:51'),
(354, 25, 1, '2014-07-08 21:56:51'),
(355, 34, 1, '2014-07-11 22:13:37'),
(356, 34, 1, '2014-07-11 22:13:38'),
(357, 25, 1, '2014-07-11 22:13:38'),
(358, 34, 1, '2014-07-12 15:29:11'),
(359, 34, 1, '2014-07-12 15:29:11'),
(360, 25, 1, '2014-07-12 15:29:11'),
(361, 35, 1, '2014-07-12 15:32:14'),
(362, 35, 1, '2014-07-12 15:32:14'),
(363, 25, 1, '2014-07-12 15:32:14'),
(364, 35, 1, '2014-07-12 15:56:14'),
(365, 35, 1, '2014-07-12 15:56:14'),
(366, 25, 1, '2014-07-12 15:56:14'),
(367, 34, 1, '2014-07-12 15:58:57'),
(368, 34, 1, '2014-07-12 15:58:57'),
(369, 25, 1, '2014-07-12 15:58:57'),
(370, 31, 1, '2014-07-12 16:12:42'),
(371, 33, 1, '2014-07-12 16:24:51'),
(372, 31, 1, '2014-07-12 16:25:10'),
(373, 28, 1, '2014-07-12 16:26:54'),
(374, 28, 1, '2014-07-12 16:26:54'),
(375, 28, 1, '2014-07-12 16:26:54'),
(376, 28, 1, '2014-07-12 16:26:54'),
(377, 28, 1, '2014-07-12 16:26:54'),
(378, 28, 1, '2014-07-12 16:26:54'),
(379, 28, 1, '2014-07-12 16:26:54'),
(380, 24, 1, '2014-07-12 16:26:54'),
(381, 26, 1, '2014-07-12 16:27:15'),
(382, 28, 1, '2014-07-12 16:27:49'),
(383, 28, 1, '2014-07-12 16:27:49'),
(384, 28, 1, '2014-07-12 16:27:49'),
(385, 28, 1, '2014-07-12 16:27:49'),
(386, 28, 1, '2014-07-12 16:27:49'),
(387, 28, 1, '2014-07-12 16:27:49'),
(388, 28, 1, '2014-07-12 16:27:49'),
(389, 24, 1, '2014-07-12 16:27:49'),
(390, 21, 1, '2014-07-14 03:30:23'),
(391, 21, 1, '2014-07-14 03:35:44'),
(392, 34, 1, '2014-07-15 22:09:30'),
(393, 34, 1, '2014-07-15 22:11:15'),
(394, 34, 1, '2014-07-15 22:13:23'),
(395, 34, 1, '2014-07-15 23:04:26'),
(396, 34, 1, '2014-07-15 23:05:18'),
(397, 34, 1, '2014-07-15 23:07:02'),
(398, 34, 1, '2014-07-15 23:09:32'),
(399, 34, 1, '2014-07-15 23:24:55'),
(400, 28, 1, '2014-07-16 13:37:34'),
(401, 28, 1, '2014-07-16 13:37:34'),
(402, 28, 1, '2014-07-16 13:37:34'),
(403, 24, 1, '2014-07-16 13:37:34'),
(404, 34, 1, '2014-07-16 15:44:30'),
(405, 34, 1, '2014-07-16 16:02:42'),
(406, 34, 1, '2014-07-16 16:03:26'),
(407, 34, 1, '2014-07-16 16:05:51'),
(408, 34, 1, '2014-07-16 16:06:53'),
(409, 34, 1, '2014-07-16 16:07:43'),
(410, 34, 1, '2014-07-16 16:08:54'),
(411, 34, 1, '2014-07-16 16:09:41'),
(412, 34, 1, '2014-07-16 16:10:57'),
(413, 35, 1, '2014-07-17 23:02:36'),
(414, 35, 1, '2014-07-17 23:02:37'),
(415, 29, 1, '2014-07-17 23:02:37'),
(416, 25, 1, '2014-07-17 23:02:37'),
(417, 26, 1, '2014-07-17 23:03:10'),
(418, 26, 1, '2014-07-17 23:05:55'),
(419, 34, 1, '2014-07-19 14:36:54'),
(420, 34, 1, '2014-07-20 00:36:38'),
(421, 34, 1, '2014-07-20 00:37:28'),
(422, 34, 1, '2014-07-20 00:47:24'),
(423, 34, 1, '2014-07-20 00:47:24'),
(424, 35, 1, '2014-07-20 00:47:29'),
(425, 34, 1, '2014-07-20 00:47:29'),
(426, 35, 1, '2014-07-20 00:48:16'),
(427, 34, 1, '2014-07-20 00:48:16'),
(428, 35, 1, '2014-07-20 00:52:00'),
(429, 34, 1, '2014-07-20 00:52:00'),
(430, 35, 1, '2014-07-20 00:53:31'),
(431, 34, 1, '2014-07-20 00:53:31'),
(432, 18, 1, '2014-07-22 23:12:45'),
(433, 34, 1, '2014-07-22 23:19:29'),
(434, 34, 1, '2014-07-22 23:28:45'),
(435, 34, 1, '2014-07-23 00:02:58'),
(436, 34, 1, '2014-07-23 16:39:31'),
(437, 34, 1, '2014-07-23 16:40:00'),
(438, 34, 1, '2014-07-23 16:40:33'),
(439, 21, 1, '2014-07-23 16:42:57'),
(440, 22, 1, '2014-07-25 14:00:00'),
(441, 34, 1, '2014-07-25 14:00:25'),
(442, 34, 1, '2014-07-25 14:02:33'),
(443, 34, 1, '2014-07-25 14:03:05'),
(444, 34, 1, '2014-07-25 14:04:12'),
(445, 34, 1, '2014-07-25 14:04:38'),
(446, 34, 1, '2014-07-25 14:05:17'),
(447, 34, 1, '2014-07-25 14:06:10'),
(448, 34, 1, '2014-07-25 14:06:38'),
(449, 28, 1, '2014-07-25 14:40:41'),
(450, 24, 1, '2014-07-25 14:40:41'),
(451, 35, 1, '2014-07-25 14:41:33'),
(452, 25, 1, '2014-07-25 14:41:33'),
(453, 26, 1, '2014-07-25 14:42:06'),
(454, 26, 1, '2014-07-25 14:45:08'),
(455, 26, 1, '2014-07-25 14:47:09'),
(456, 18, 1, '2014-07-27 23:43:55'),
(457, 21, 1, '2014-07-27 23:43:55'),
(458, 34, 1, '2014-07-27 23:52:17'),
(459, 34, 1, '2014-07-31 14:55:51'),
(460, 34, 1, '2014-07-31 14:56:32'),
(461, 34, 1, '2014-07-31 15:15:42'),
(462, 34, 1, '2014-08-01 16:36:41'),
(463, 34, 1, '2014-08-01 16:54:43'),
(464, 34, 1, '2014-08-01 16:56:43'),
(465, 34, 1, '2014-08-01 16:58:23'),
(466, 34, 1, '2014-08-02 16:28:56'),
(467, 34, 1, '2014-08-02 16:33:55'),
(468, 34, 1, '2014-08-02 18:55:06'),
(469, 34, 1, '2014-08-07 20:33:17'),
(470, 34, 1, '2014-08-07 20:35:18'),
(471, 34, 1, '2014-08-07 23:36:04'),
(472, 34, 1, '2014-08-08 14:32:27'),
(473, 34, 1, '2014-08-08 14:50:39'),
(474, 34, 1, '2014-08-08 14:51:15'),
(475, 34, 1, '2014-08-08 14:51:39'),
(476, 21, 1, '2014-08-08 20:07:30'),
(477, 21, 1, '2014-08-08 20:08:02'),
(478, 21, 1, '2014-08-08 20:08:28'),
(479, 21, 1, '2014-08-08 20:08:45'),
(480, 24, 1, '2014-08-08 23:13:07'),
(481, 24, 1, '2014-08-08 23:21:20'),
(482, 28, 1, '2014-08-08 23:21:20'),
(483, 28, 1, '2014-08-08 23:21:20'),
(484, 28, 1, '2014-08-08 23:21:20'),
(485, 28, 1, '2014-08-08 23:21:20'),
(486, 28, 1, '2014-08-08 23:21:20'),
(487, 24, 1, '2014-08-08 23:35:41'),
(488, 28, 1, '2014-08-08 23:35:41'),
(489, 28, 1, '2014-08-08 23:35:41'),
(490, 28, 1, '2014-08-08 23:35:41'),
(491, 28, 1, '2014-08-08 23:35:41'),
(492, 24, 1, '2014-08-08 23:36:21'),
(493, 28, 1, '2014-08-08 23:36:21'),
(494, 28, 1, '2014-08-08 23:36:21'),
(495, 28, 1, '2014-08-08 23:36:21'),
(496, 28, 1, '2014-08-08 23:36:21'),
(497, 24, 1, '2014-08-09 12:37:15'),
(498, 28, 1, '2014-08-09 12:37:15'),
(499, 28, 1, '2014-08-09 12:37:15'),
(500, 28, 1, '2014-08-09 12:37:15'),
(501, 28, 1, '2014-08-09 12:37:15'),
(502, 24, 1, '2014-08-09 12:41:27'),
(503, 28, 1, '2014-08-09 12:45:47'),
(504, 28, 1, '2014-08-09 12:45:47'),
(505, 28, 1, '2014-08-09 12:45:47'),
(506, 24, 1, '2014-08-09 12:45:47'),
(507, 24, 1, '2014-08-09 12:53:07'),
(508, 28, 1, '2014-08-09 12:53:07'),
(509, 28, 1, '2014-08-09 12:53:07'),
(510, 28, 1, '2014-08-09 12:53:07'),
(511, 28, 1, '2014-08-09 12:53:07'),
(512, 24, 1, '2014-08-09 13:20:38'),
(513, 28, 1, '2014-08-09 13:20:38'),
(514, 28, 1, '2014-08-09 13:20:38'),
(515, 28, 1, '2014-08-09 13:20:38'),
(516, 28, 1, '2014-08-09 13:20:38'),
(517, 28, 1, '2014-08-09 13:20:38'),
(518, 21, 1, '2014-08-09 13:24:56'),
(519, 31, 1, '2014-08-11 21:43:25'),
(520, 21, 1, '2014-08-11 22:15:23'),
(521, 21, 1, '2014-08-11 22:15:45'),
(522, 24, 1, '2014-08-12 00:16:35'),
(523, 28, 1, '2014-08-12 00:16:35'),
(524, 28, 1, '2014-08-12 00:16:35'),
(525, 28, 1, '2014-08-12 00:16:35'),
(526, 28, 1, '2014-08-12 00:16:35'),
(527, 28, 1, '2014-08-12 00:16:35'),
(528, 28, 1, '2014-08-12 00:16:35'),
(529, 28, 1, '2014-08-12 00:16:35'),
(530, 28, 1, '2014-08-12 00:16:35'),
(531, 34, 1, '2014-08-12 14:59:48'),
(532, 34, 1, '2014-08-14 00:23:09'),
(533, 34, 1, '2014-08-14 00:28:21'),
(534, 34, 1, '2014-08-14 00:29:52'),
(535, 24, 1, '2014-08-15 15:51:24'),
(536, 28, 1, '2014-08-15 15:51:24'),
(537, 28, 1, '2014-08-15 15:51:24'),
(538, 28, 1, '2014-08-15 15:51:24'),
(539, 28, 1, '2014-08-15 15:51:24'),
(540, 28, 1, '2014-08-15 15:51:24'),
(541, 24, 1, '2014-08-15 16:37:11'),
(542, 28, 1, '2014-08-15 16:37:11'),
(543, 28, 1, '2014-08-15 16:37:11'),
(544, 28, 1, '2014-08-15 16:37:11'),
(545, 28, 1, '2014-08-15 16:37:11'),
(546, 24, 1, '2014-08-16 11:03:18'),
(547, 28, 1, '2014-08-16 11:03:18'),
(548, 28, 1, '2014-08-16 11:03:18'),
(549, 28, 1, '2014-08-16 11:03:18'),
(550, 28, 1, '2014-08-16 11:03:18'),
(551, 24, 1, '2014-08-16 11:10:24'),
(552, 28, 1, '2014-08-16 11:10:24'),
(553, 28, 1, '2014-08-16 11:10:24'),
(554, 28, 1, '2014-08-16 11:10:24'),
(555, 28, 1, '2014-08-16 11:10:24'),
(556, 24, 1, '2014-08-16 11:11:18'),
(557, 28, 1, '2014-08-16 11:11:18'),
(558, 28, 1, '2014-08-16 11:11:18'),
(559, 28, 1, '2014-08-16 11:11:18'),
(560, 28, 1, '2014-08-16 11:11:18'),
(561, 24, 1, '2014-08-16 11:17:37'),
(562, 28, 1, '2014-08-16 11:17:37'),
(563, 28, 1, '2014-08-16 11:17:37'),
(564, 28, 1, '2014-08-16 11:17:37'),
(565, 28, 1, '2014-08-16 11:17:37'),
(566, 28, 1, '2014-08-16 11:17:37'),
(567, 28, 1, '2014-08-16 11:17:37'),
(568, 28, 1, '2014-08-16 11:17:37'),
(569, 28, 1, '2014-08-16 11:17:37'),
(570, 34, 1, '2014-08-16 11:27:44'),
(571, 34, 1, '2014-08-16 11:35:22'),
(572, 34, 1, '2014-08-16 11:36:56'),
(573, 34, 1, '2014-08-16 11:38:06'),
(574, 34, 1, '2014-08-16 15:38:29'),
(575, 26, 1, '2014-08-16 16:07:31'),
(576, 35, 1, '2014-08-16 16:20:40'),
(577, 29, 1, '2014-08-16 16:20:40'),
(578, 29, 1, '2014-08-16 16:20:40'),
(579, 29, 1, '2014-08-16 16:20:40'),
(580, 29, 1, '2014-08-16 16:20:40'),
(581, 35, 1, '2014-08-16 16:20:40'),
(582, 29, 1, '2014-08-16 16:20:40'),
(583, 29, 1, '2014-08-16 16:20:40'),
(584, 29, 1, '2014-08-16 16:20:40'),
(585, 29, 1, '2014-08-16 16:20:40'),
(586, 25, 1, '2014-08-16 16:20:40'),
(587, 35, 1, '2014-08-16 16:29:30'),
(588, 29, 1, '2014-08-16 16:29:30'),
(589, 29, 1, '2014-08-16 16:29:30'),
(590, 29, 1, '2014-08-16 16:29:30'),
(591, 29, 1, '2014-08-16 16:29:31'),
(592, 35, 1, '2014-08-16 16:29:31'),
(593, 29, 1, '2014-08-16 16:29:31'),
(594, 29, 1, '2014-08-16 16:29:31'),
(595, 29, 1, '2014-08-16 16:29:31'),
(596, 29, 1, '2014-08-16 16:29:31'),
(597, 25, 1, '2014-08-16 16:29:31'),
(598, 35, 1, '2014-08-16 16:32:36'),
(599, 29, 1, '2014-08-16 16:32:36'),
(600, 29, 1, '2014-08-16 16:32:36'),
(601, 29, 1, '2014-08-16 16:32:36'),
(602, 29, 1, '2014-08-16 16:32:36'),
(603, 35, 1, '2014-08-16 16:32:36'),
(604, 29, 1, '2014-08-16 16:32:36'),
(605, 29, 1, '2014-08-16 16:32:36'),
(606, 29, 1, '2014-08-16 16:32:36'),
(607, 29, 1, '2014-08-16 16:32:36'),
(608, 25, 1, '2014-08-16 16:32:36'),
(609, 34, 1, '2014-08-17 12:08:42'),
(610, 34, 1, '2014-08-17 23:28:44'),
(611, 34, 1, '2014-08-19 21:17:41'),
(612, 34, 1, '2014-08-19 21:18:39'),
(613, 34, 1, '2014-08-19 21:19:07'),
(614, 34, 1, '2014-08-19 21:19:41'),
(615, 34, 1, '2014-08-19 21:19:55'),
(616, 34, 1, '2014-08-19 21:20:57'),
(617, 34, 1, '2014-08-19 21:23:57'),
(618, 34, 1, '2014-08-19 22:33:07'),
(619, 34, 1, '2014-08-19 22:38:34'),
(620, 35, 1, '2014-08-21 00:20:13'),
(621, 35, 1, '2014-08-21 00:20:13'),
(622, 34, 1, '2014-08-21 01:54:47'),
(623, 34, 1, '2014-08-21 01:57:14'),
(624, 34, 1, '2014-08-21 01:57:14'),
(625, 34, 1, '2014-08-23 16:14:37'),
(626, 34, 1, '2014-08-25 23:48:05'),
(627, 34, 1, '2014-08-25 23:48:40'),
(628, 31, 1, '2014-08-26 22:48:04'),
(629, 28, 1, '2014-08-26 22:50:37'),
(630, 28, 1, '2014-08-26 22:50:37'),
(631, 28, 1, '2014-08-26 22:50:37'),
(632, 28, 1, '2014-08-26 22:50:37'),
(633, 28, 1, '2014-08-26 22:50:37'),
(634, 28, 1, '2014-08-26 22:50:37'),
(635, 28, 1, '2014-08-26 22:50:37'),
(636, 24, 1, '2014-08-26 22:50:37'),
(637, 28, 1, '2014-08-26 23:06:21'),
(638, 28, 1, '2014-08-26 23:06:21'),
(639, 28, 1, '2014-08-26 23:06:21'),
(640, 28, 1, '2014-08-26 23:06:21'),
(641, 28, 1, '2014-08-26 23:06:21'),
(642, 28, 1, '2014-08-26 23:06:21'),
(643, 28, 1, '2014-08-26 23:06:21'),
(644, 24, 1, '2014-08-26 23:06:21'),
(645, 35, 1, '2014-08-26 23:53:27'),
(646, 29, 1, '2014-08-26 23:53:27'),
(647, 29, 1, '2014-08-26 23:53:27'),
(648, 29, 1, '2014-08-26 23:53:27'),
(649, 29, 1, '2014-08-26 23:53:27'),
(650, 35, 1, '2014-08-26 23:53:27'),
(651, 29, 1, '2014-08-26 23:53:27'),
(652, 29, 1, '2014-08-26 23:53:27'),
(653, 29, 1, '2014-08-26 23:53:27'),
(654, 29, 1, '2014-08-26 23:53:27'),
(655, 25, 1, '2014-08-26 23:53:27'),
(656, 21, 1, '2014-08-30 20:05:08'),
(657, 23, 1, '2014-08-30 20:18:05'),
(658, 21, 1, '2014-08-30 20:19:23'),
(659, 18, 1, '2014-09-04 14:57:02'),
(660, 21, 1, '2014-09-04 14:57:02'),
(661, 21, 1, '2014-09-04 14:58:53');

-- --------------------------------------------------------

-- 
-- Table structure for table `usergroups`
-- 

CREATE TABLE `usergroups` (
  `Id` int(11) NOT NULL auto_increment,
  `GroupId` tinyint(4) NOT NULL,
  `UserId` int(11) NOT NULL,
  PRIMARY KEY  (`Id`),
  KEY `GroupId` (`GroupId`),
  KEY `UserId` (`UserId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=11 ;

-- 
-- Dumping data for table `usergroups`
-- 

INSERT INTO `usergroups` (`Id`, `GroupId`, `UserId`) VALUES 
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 3, 2),
(8, 4, 2),
(10, 5, 2);

-- --------------------------------------------------------

-- 
-- Table structure for table `users`
-- 

CREATE TABLE `users` (
  `Id` int(11) NOT NULL auto_increment,
  `FullName` varchar(100) collate utf8_unicode_ci NOT NULL,
  `Email` varchar(100) collate utf8_unicode_ci NOT NULL,
  `Address` text collate utf8_unicode_ci,
  `Phone` varchar(20) collate utf8_unicode_ci default NULL,
  `Sex` tinyint(1) default NULL,
  `UserName` varchar(50) collate utf8_unicode_ci NOT NULL,
  `Password` varchar(50) collate utf8_unicode_ci NOT NULL,
  `CreateDate` datetime default NULL,
  `CreateBy` int(11) default NULL,
  `EditDate` datetime default NULL,
  `EditBy` int(11) default NULL,
  `IsDeleted` tinyint(1) NOT NULL,
  `DeleteDate` datetime default NULL,
  `DeleteBy` int(11) default NULL,
  `LastAccess` datetime default NULL,
  PRIMARY KEY  (`Id`),
  KEY `UserName` (`UserName`),
  KEY `DeleteBy` (`DeleteBy`),
  KEY `CreateBy` (`CreateBy`),
  KEY `EditBy` (`EditBy`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

-- 
-- Dumping data for table `users`
-- 

INSERT INTO `users` (`Id`, `FullName`, `Email`, `Address`, `Phone`, `Sex`, `UserName`, `Password`, `CreateDate`, `CreateBy`, `EditDate`, `EditBy`, `IsDeleted`, `DeleteDate`, `DeleteBy`, `LastAccess`) VALUES 
(1, 'HelixT Manager', 'maxim.alhelow@gmail.com', 'Syria, Lattakia', '00963932959743', 0, 'mgr', 'cfd12d74bca9357022eb7d8367bcab26', '2014-05-11 00:00:00', NULL, NULL, NULL, 0, NULL, NULL, '2015-05-19 13:55:24'),
(2, 'Test User', 't@t.com', 'Somewheree', '00000', 0, 'test', '202cb962ac59075b964b07152d234b70', '0000-00-00 00:00:00', 1, '2014-05-15 00:00:00', 1, 0, NULL, NULL, NULL);

-- 
-- Constraints for dumped tables
-- 

-- 
-- Constraints for table `contentproperties`
-- 
ALTER TABLE `contentproperties`
  ADD CONSTRAINT `contentproperties_ibfk_1` FOREIGN KEY (`ContentId`) REFERENCES `contents` (`Id`),
  ADD CONSTRAINT `contentproperties_ibfk_2` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`Id`),
  ADD CONSTRAINT `contentproperties_ibfk_3` FOREIGN KEY (`ValueDictionaryId`) REFERENCES `dictionary` (`TextId`);

-- 
-- Constraints for table `contents`
-- 
ALTER TABLE `contents`
  ADD CONSTRAINT `contents_ibfk_4` FOREIGN KEY (`TypeId`) REFERENCES `contenttypes` (`Id`),
  ADD CONSTRAINT `contents_ibfk_5` FOREIGN KEY (`CategoryId`) REFERENCES `contentcategories` (`Id`),
  ADD CONSTRAINT `contents_ibfk_6` FOREIGN KEY (`ParentId`) REFERENCES `contents` (`Id`);

-- 
-- Constraints for table `contenttranslation`
-- 
ALTER TABLE `contenttranslation`
  ADD CONSTRAINT `contenttranslation_ibfk_10` FOREIGN KEY (`TranslatedBy`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `contenttranslation_ibfk_8` FOREIGN KEY (`TextId`) REFERENCES `dictionary` (`TextId`),
  ADD CONSTRAINT `contenttranslation_ibfk_9` FOREIGN KEY (`LanguageId`) REFERENCES `languages` (`Id`);

-- 
-- Constraints for table `contenttypes`
-- 
ALTER TABLE `contenttypes`
  ADD CONSTRAINT `contenttypes_ibfk_1` FOREIGN KEY (`NameDictionaryId`) REFERENCES `dictionary` (`TextId`);

-- 
-- Constraints for table `folders`
-- 
ALTER TABLE `folders`
  ADD CONSTRAINT `folders_ibfk_1` FOREIGN KEY (`ParentId`) REFERENCES `folders` (`Id`);

-- 
-- Constraints for table `grouppermissions`
-- 
ALTER TABLE `grouppermissions`
  ADD CONSTRAINT `grouppermissions_ibfk_3` FOREIGN KEY (`GroupId`) REFERENCES `groups` (`Id`),
  ADD CONSTRAINT `grouppermissions_ibfk_4` FOREIGN KEY (`ActionId`) REFERENCES `actions` (`Id`);

-- 
-- Constraints for table `languages`
-- 
ALTER TABLE `languages`
  ADD CONSTRAINT `languages_ibfk_1` FOREIGN KEY (`Language`) REFERENCES `dictionary` (`TextId`);

-- 
-- Constraints for table `pagecontents`
-- 
ALTER TABLE `pagecontents`
  ADD CONSTRAINT `pagecontents_ibfk_3` FOREIGN KEY (`PageId`) REFERENCES `pages` (`Id`),
  ADD CONSTRAINT `pagecontents_ibfk_4` FOREIGN KEY (`ContentId`) REFERENCES `contents` (`Id`);

-- 
-- Constraints for table `pages`
-- 
ALTER TABLE `pages`
  ADD CONSTRAINT `pages_ibfk_1` FOREIGN KEY (`FolderId`) REFERENCES `folders` (`Id`),
  ADD CONSTRAINT `pages_ibfk_2` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `pages_ibfk_3` FOREIGN KEY (`EditBy`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `pages_ibfk_4` FOREIGN KEY (`DeleteBy`) REFERENCES `users` (`Id`);

-- 
-- Constraints for table `phrasetranslation`
-- 
ALTER TABLE `phrasetranslation`
  ADD CONSTRAINT `phrasetranslation_ibfk_4` FOREIGN KEY (`TextId`) REFERENCES `dictionary` (`TextId`),
  ADD CONSTRAINT `phrasetranslation_ibfk_5` FOREIGN KEY (`LanguageId`) REFERENCES `languages` (`Id`),
  ADD CONSTRAINT `phrasetranslation_ibfk_6` FOREIGN KEY (`TranslateBy`) REFERENCES `users` (`Id`);

-- 
-- Constraints for table `properties`
-- 
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_3` FOREIGN KEY (`NameDictionaryId`) REFERENCES `dictionary` (`TextId`),
  ADD CONSTRAINT `properties_ibfk_4` FOREIGN KEY (`ValueType`) REFERENCES `dictionary` (`TextId`),
  ADD CONSTRAINT `properties_ibfk_5` FOREIGN KEY (`ContentTypeId`) REFERENCES `contenttypes` (`Id`),
  ADD CONSTRAINT `properties_ibfk_6` FOREIGN KEY (`ViewComponent`) REFERENCES `dictionary` (`TextId`);

-- 
-- Constraints for table `useractions`
-- 
ALTER TABLE `useractions`
  ADD CONSTRAINT `useractions_ibfk_3` FOREIGN KEY (`ActionId`) REFERENCES `actions` (`Id`),
  ADD CONSTRAINT `useractions_ibfk_4` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`);

-- 
-- Constraints for table `usergroups`
-- 
ALTER TABLE `usergroups`
  ADD CONSTRAINT `usergroups_ibfk_3` FOREIGN KEY (`GroupId`) REFERENCES `groups` (`Id`),
  ADD CONSTRAINT `usergroups_ibfk_4` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`);

-- 
-- Constraints for table `users`
-- 
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`EditBy`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `users_ibfk_4` FOREIGN KEY (`DeleteBy`) REFERENCES `users` (`Id`);
