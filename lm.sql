/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : lm

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2019-04-17 18:58:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bx_user
-- ----------------------------
DROP TABLE IF EXISTS `bx_user`;
CREATE TABLE `bx_user` (
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
-- Records of bx_user
-- ----------------------------

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
  `isok` tinyint(1) DEFAULT '1' COMMENT '是否被删除',
  `add_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=86 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_xp
-- ----------------------------
INSERT INTO `lm_xp` VALUES ('78', '1', '夏日', '冬阳', '你是夏日风雨,\r\n冬日里的暖阳，\r\n温柔了岁月，惊艳了时光。', '2019041717492378989.jpg', '0', '0', '50', '1', '1555494563');
INSERT INTO `lm_xp` VALUES ('81', '1', '心晴', '心安', '爱无非是,\r\n初见你心晴，\r\n久见你心安。', '2019041717534098169.jpg', '0', '0', '50', '1', '1555494820');
INSERT INTO `lm_xp` VALUES ('85', '1', '背影', '决心', '知道不该打扰你,\r\n但每次偷看你背影，\r\n都不忍再下决心。', '2019041717562219374.jpg', '0', '0', '50', '1', '1555494982');
