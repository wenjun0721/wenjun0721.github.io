/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : lm

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2019-04-22 19:26:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for lm_background
-- ----------------------------
DROP TABLE IF EXISTS `lm_background`;
CREATE TABLE `lm_background` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `img` varchar(255) DEFAULT NULL COMMENT '图片',
  `imgName` varchar(255) DEFAULT NULL COMMENT '图片名称',
  `useclick` int(11) DEFAULT '0' COMMENT '使用次数',
  `downclick` int(11) DEFAULT '0' COMMENT '被下载的次数',
  `is_recom` tinyint(1) DEFAULT '0' COMMENT '是否推荐',
  `sort` int(11) DEFAULT '100' COMMENT '排序',
  `isshow` tinyint(1) DEFAULT '1' COMMENT '是否显示',
  `isok` tinyint(1) DEFAULT '1' COMMENT '是否有效',
  `userId` int(11) DEFAULT '0' COMMENT '0为系统的背景图，其他的为对应的会员上传的',
  `catId` int(11) DEFAULT '0' COMMENT '背景图分类ID',
  `ischeck` tinyint(1) DEFAULT '1' COMMENT '用于用户上传给系统的时候，管理员审核，1为通过，0为未审核，-1为拒绝',
  `remakeId` int(11) DEFAULT NULL COMMENT '拒绝用户的理由ID',
  `add_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_background
-- ----------------------------
INSERT INTO `lm_background` VALUES ('1', '1.jpg', '甜蜜', '0', '0', '0', '101', '1', '1', '0', '0', '1', null, '1523486289');
INSERT INTO `lm_background` VALUES ('2', '2.jpg', '回忆', '0', '0', '1', '100', '1', '1', '0', '0', '1', null, '1568315237');
INSERT INTO `lm_background` VALUES ('3', '3.jpg', '爱', '0', '0', '0', '100', '1', '1', '0', '0', '1', null, '1523698752');

-- ----------------------------
-- Table structure for lm_background_cat
-- ----------------------------
DROP TABLE IF EXISTS `lm_background_cat`;
CREATE TABLE `lm_background_cat` (
  `catId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL COMMENT '0未系统',
  `catName` varchar(255) DEFAULT NULL,
  `sort` int(11) DEFAULT '100' COMMENT '排序',
  `is_recom` tinyint(1) DEFAULT '0' COMMENT '是否推荐',
  `isok` tinyint(1) DEFAULT '1' COMMENT '是否删除/无效',
  `isshow` tinyint(1) DEFAULT '1' COMMENT '是否显示',
  `add_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`catId`),
  UNIQUE KEY `catId` (`catId`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_background_cat
-- ----------------------------
INSERT INTO `lm_background_cat` VALUES ('1', '0', '粉色回忆', '100', '0', '1', '1', '1523568712');
INSERT INTO `lm_background_cat` VALUES ('2', '0', '甜甜蜜蜜', '100', '0', '1', '1', '1523675892');
INSERT INTO `lm_background_cat` VALUES ('3', '1', '爱的味道', '100', '0', '1', '1', '1528730158');

-- ----------------------------
-- Table structure for lm_user
-- ----------------------------
DROP TABLE IF EXISTS `lm_user`;
CREATE TABLE `lm_user` (
  `userId` int(11) NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `userAddress` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `openId` varchar(255) DEFAULT NULL,
  `unionId` varchar(255) DEFAULT NULL,
  `add_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_user
-- ----------------------------
INSERT INTO `lm_user` VALUES ('1', '句号。', '广东茂名', '1', '123', '456', '1567852367');

-- ----------------------------
-- Table structure for lm_xp
-- ----------------------------
DROP TABLE IF EXISTS `lm_xp`;
CREATE TABLE `lm_xp` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `toUser` varchar(255) DEFAULT NULL,
  `fromUser` varchar(255) DEFAULT NULL,
  `text` text,
  `img` varchar(255) DEFAULT NULL,
  `is_recom` tinyint(1) DEFAULT '0' COMMENT '是否为分享相册',
  `click` int(11) DEFAULT '0' COMMENT '点赞数',
  `sort` int(11) DEFAULT '50' COMMENT '排序',
  `isshow` tinyint(1) DEFAULT '1' COMMENT '是否显示',
  `isok` tinyint(1) DEFAULT '1' COMMENT '是否被删除/无效',
  `loveCatId` int(11) DEFAULT '0' COMMENT '相册ID，0为默认相册',
  `add_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=89 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_xp
-- ----------------------------
INSERT INTO `lm_xp` VALUES ('78', '1', '夏日', '冬阳', '你是夏日风雨,\r\n冬日里的暖阳，\r\n温柔了岁月，惊艳了时光。', '2019041717492378989.jpg', '0', '0', '50', '1', '1', '0', '1555494563');
INSERT INTO `lm_xp` VALUES ('81', '1', '心晴', '心安', '爱无非是,\r\n初见你心晴，\r\n久见你心安。', '2019041717534098169.jpg', '0', '0', '50', '1', '1', '0', '1555494820');
INSERT INTO `lm_xp` VALUES ('85', '1', '背影', '决心', '知道不该打扰你,\r\n但每次偷看你背影，\r\n都不忍再下决心。', '2019041717562219374.jpg', '0', '0', '50', '1', '1', '0', '1555494982');
INSERT INTO `lm_xp` VALUES ('86', '1', '花开', '花落', '人生如是也！', 'upload/love/2019042218505022310.jpg', '0', '0', '50', '1', '1', '0', '1555930250');
INSERT INTO `lm_xp` VALUES ('87', '1', '月圆', '月缺', '又一月！', 'upload/love/2019042218523484205.jpg', '0', '0', '50', '1', '1', '0', '1555930354');
INSERT INTO `lm_xp` VALUES ('88', '1', '月圆', '月缺', '又一月！', 'upload/love/2019042218550248035.jpg', '0', '0', '50', '1', '1', '0', '1555930502');
