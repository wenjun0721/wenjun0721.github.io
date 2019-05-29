/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : lm

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2019-05-29 11:24:48
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
  `isok` tinyint(1) DEFAULT '1' COMMENT '是否被删除/无效',
  `userId` int(11) DEFAULT '0' COMMENT '0为系统的背景图，其他的为对应的会员上传的',
  `catId` int(11) DEFAULT '0' COMMENT '背景图分类ID',
  `ischeck` tinyint(1) DEFAULT '1' COMMENT '用于用户上传给系统的时候，管理员审核，1为通过，0为未审核，-1为拒绝',
  `remakeId` int(11) DEFAULT NULL COMMENT '拒绝用户的理由ID',
  `add_time` int(11) DEFAULT NULL,
  `del_time` int(11) DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_background
-- ----------------------------
INSERT INTO `lm_background` VALUES ('1', 'upload/background/1.jpg', '', '0', '0', '0', '98', '1', '1', '0', '0', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('2', 'upload/background/2.jpg', '', '0', '0', '0', '100', '1', '1', '0', '0', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('3', 'upload/background/3.jpg', '', '0', '0', '0', '100', '1', '1', '0', '0', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('9', 'upload/background/c1.jpg', '', '0', '0', '0', '100', '1', '1', '0', '1', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('6', 'upload/background/4.jpg', '', '0', '0', '0', '99', '1', '1', '0', '0', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('7', 'upload/background/5.jpg', '', '0', '0', '0', '100', '1', '1', '0', '0', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('8', 'upload/background/6.jpg', '', '0', '0', '0', '100', '1', '1', '0', '0', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('10', 'upload/background/c2.jpg', '', '0', '0', '0', '100', '1', '1', '0', '1', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('11', 'upload/background/c3.jpg', '', '0', '0', '0', '100', '1', '1', '0', '1', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('12', 'upload/background/c4.jpg', '', '0', '0', '0', '100', '1', '1', '0', '1', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('13', 'upload/background/c5.jpg', '', '0', '0', '0', '100', '1', '1', '0', '1', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('36', 'upload/background/2/20190527/155894357261976.png', null, '0', '0', '0', '100', '1', '1', '2', '0', '1', null, '1558943578', null);
INSERT INTO `lm_background` VALUES ('15', 'upload/background/c6.jpg', '', '0', '0', '0', '100', '1', '1', '0', '1', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('16', 'upload/background/c7.jpg', '', '0', '0', '0', '100', '1', '1', '0', '1', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('17', 'upload/background/c8.jpg', '', '0', '0', '0', '100', '1', '1', '0', '1', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('18', 'upload/background/c9.jpg', '', '0', '0', '0', '100', '1', '1', '0', '1', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('19', 'upload/background/c10.jpg', '', '0', '0', '0', '100', '1', '1', '0', '1', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('20', 'upload/background/7.jpg', '', '0', '0', '0', '100', '1', '1', '0', '0', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('21', 'upload/background/8.jpg', '', '0', '0', '0', '100', '1', '1', '0', '0', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('22', 'upload/background/x1.jpg', '', '0', '0', '0', '100', '1', '1', '0', '3', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('23', 'upload/background/x2.jpg', '', '0', '0', '0', '100', '1', '1', '0', '3', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('24', 'upload/background/x3.jpg', '', '0', '0', '0', '100', '1', '1', '0', '3', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('25', 'upload/background/x4.jpg', '', '0', '0', '0', '100', '1', '1', '0', '3', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('26', 'upload/background/x5.jpg', '', '0', '0', '0', '100', '1', '1', '0', '3', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('27', 'upload/background/x6.jpg', '', '0', '0', '0', '100', '1', '1', '0', '3', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('28', 'upload/background/x7.jpg', '', '0', '0', '0', '100', '1', '1', '0', '3', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('29', 'upload/background/cs1.jpg', '', '0', '0', '0', '10', '1', '1', '0', '2', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('30', 'upload/background/cs2.jpg', '', '0', '0', '0', '10', '1', '1', '0', '2', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('31', 'upload/background/cs3.jpg', '', '0', '0', '0', '10', '1', '1', '0', '2', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('32', 'upload/background/cs4.jpg', '', '0', '0', '0', '10', '1', '1', '0', '2', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('33', 'upload/background/cs5.jpg', '', '0', '0', '0', '10', '1', '1', '0', '2', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('34', 'upload/background/cs6.jpg', '', '0', '0', '0', '10', '1', '1', '0', '2', '1', null, '1558928853', null);
INSERT INTO `lm_background` VALUES ('35', 'upload/background/cs7.jpg', '', '0', '0', '0', '10', '1', '1', '0', '2', '1', null, '1558928853', null);

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
  `del_time` int(11) DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`catId`),
  UNIQUE KEY `catId` (`catId`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_background_cat
-- ----------------------------
INSERT INTO `lm_background_cat` VALUES ('1', '0', '春意浓浓', '2', '0', '1', '1', '1523568712', null);
INSERT INTO `lm_background_cat` VALUES ('2', '0', '纯背景', '1', '0', '1', '1', '1523675892', null);
INSERT INTO `lm_background_cat` VALUES ('3', '0', '夏日星空', '3', '0', '1', '1', '1523675892', null);

-- ----------------------------
-- Table structure for lm_cat
-- ----------------------------
DROP TABLE IF EXISTS `lm_cat`;
CREATE TABLE `lm_cat` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `is_recom` tinyint(1) DEFAULT '0' COMMENT '是否推荐',
  `isok` tinyint(1) DEFAULT '1' COMMENT '是否被删除/无效',
  `sort` varchar(255) DEFAULT '100',
  `isshow` tinyint(1) DEFAULT '1' COMMENT '是否能被查看',
  `add_time` int(11) DEFAULT NULL,
  `del_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userId` (`userId`),
  KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_cat
-- ----------------------------
INSERT INTO `lm_cat` VALUES ('1', '2', '相册1', '0', '1', '100', '1', '1523589632', null);

-- ----------------------------
-- Table structure for lm_collection
-- ----------------------------
DROP TABLE IF EXISTS `lm_collection`;
CREATE TABLE `lm_collection` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sharerId` int(11) DEFAULT NULL COMMENT '相册ID',
  `userId` int(11) DEFAULT NULL COMMENT '哪个用户收藏',
  `isshow` tinyint(1) DEFAULT '1' COMMENT '分享的用户是否还给查看',
  `isok` tinyint(1) DEFAULT '1' COMMENT '是否被删除/无效',
  `sort` int(11) DEFAULT '100' COMMENT '排序',
  `add_time` int(11) DEFAULT NULL,
  `del_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userId` (`userId`),
  KEY `sharerId` (`sharerId`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_collection
-- ----------------------------
INSERT INTO `lm_collection` VALUES ('8', '93', '2', '1', '1', '100', '1558944035', null);

-- ----------------------------
-- Table structure for lm_sharer
-- ----------------------------
DROP TABLE IF EXISTS `lm_sharer`;
CREATE TABLE `lm_sharer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '锦集名称',
  `videoId` int(11) DEFAULT '1' COMMENT '背景音乐ID',
  `isshow` tinyint(1) DEFAULT '1' COMMENT '是否能被查看',
  `isSharer` tinyint(1) DEFAULT '0' COMMENT '是否分享过',
  `sharerCode` varchar(255) DEFAULT NULL COMMENT '分享二维码',
  `sharerClick` int(11) DEFAULT '0' COMMENT '被查看数',
  `sharerLove` int(11) DEFAULT '0' COMMENT '点赞数',
  `sharerImg` varchar(255) DEFAULT NULL COMMENT '分享后的封面图',
  `is_recom` tinyint(1) DEFAULT '0' COMMENT '是否推荐',
  `sort` int(11) DEFAULT '100',
  `isok` tinyint(1) DEFAULT '1' COMMENT '是否被删除/无效',
  `add_time` int(11) DEFAULT NULL,
  `del_time` int(11) DEFAULT NULL COMMENT '删除时间',
  `sharer_time` int(11) DEFAULT NULL COMMENT '分享时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=94 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_sharer
-- ----------------------------
INSERT INTO `lm_sharer` VALUES ('93', '2', '我的', '1', '1', '1', 'D:\\phpStudy\\WWW\\lm2\\upload/qrcode/2/20190527\\93.png', '8', '1', 'upload/love/2/20190527/2019052715271296883.jpg', '0', '100', '1', '1558943483', null, '1558947758');

-- ----------------------------
-- Table structure for lm_sharer_img
-- ----------------------------
DROP TABLE IF EXISTS `lm_sharer_img`;
CREATE TABLE `lm_sharer_img` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sharerId` int(11) DEFAULT '0' COMMENT '分享锦集ID',
  `userId` int(11) DEFAULT NULL,
  `xpId` int(11) DEFAULT '0' COMMENT '相片对应的ID',
  `img` varchar(255) DEFAULT NULL,
  `sort` int(11) DEFAULT '100',
  `isshow` tinyint(1) DEFAULT '1' COMMENT '是否显示',
  `click` int(11) DEFAULT '0' COMMENT '点赞数',
  `isok` tinyint(1) DEFAULT '1' COMMENT '是否被删除/无效',
  `add_time` int(11) DEFAULT NULL,
  `del_time` int(11) DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userId` (`userId`),
  KEY `sharerId` (`sharerId`),
  KEY `xpId` (`xpId`)
) ENGINE=MyISAM AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_sharer_img
-- ----------------------------
INSERT INTO `lm_sharer_img` VALUES ('77', '93', '2', '110', 'upload/love/2/20190527/2019052715505647947.jpg', '100', '1', '0', '1', '1558943483', null);
INSERT INTO `lm_sharer_img` VALUES ('78', '93', '2', '109', 'upload/love/2/20190527/2019052715492967091.jpg', '100', '1', '0', '1', '1558943483', null);
INSERT INTO `lm_sharer_img` VALUES ('79', '93', '2', '108', 'upload/love/2/20190527/2019052715271296883.jpg', '100', '1', '0', '1', '1558943483', null);

-- ----------------------------
-- Table structure for lm_users
-- ----------------------------
DROP TABLE IF EXISTS `lm_users`;
CREATE TABLE `lm_users` (
  `userId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `userAddress` varchar(255) DEFAULT NULL,
  `userImg` varchar(255) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT '0' COMMENT '性别',
  `openId` varchar(255) DEFAULT NULL,
  `unionId` varchar(255) DEFAULT NULL,
  `isok` tinyint(1) DEFAULT '1' COMMENT '是否有效',
  `add_time` int(11) DEFAULT NULL,
  `del_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_users
-- ----------------------------
INSERT INTO `lm_users` VALUES ('2', '句号。', '广东茂名', 'https://wx.qlogo.cn/mmopen/vi_32/ia1g5dpwhiaiciaQ82DkCV5wdxPaGdYx8FsZ5YAb2YYDI2zQibV0OVayNibHwzCSNiakJD9jIHDnomsSibA40ictN0kfdJA/132', '1', 'oEpE75BHswej1ZtMrUcK3pGN69Ro', '', '1', '1558513031', null);

-- ----------------------------
-- Table structure for lm_video
-- ----------------------------
DROP TABLE IF EXISTS `lm_video`;
CREATE TABLE `lm_video` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `video` varchar(255) DEFAULT NULL,
  `video_name` varchar(255) DEFAULT NULL COMMENT '用于显示名称',
  `userId` int(11) DEFAULT '0' COMMENT '用户ID',
  `isok` tinyint(1) DEFAULT '1' COMMENT '是否被删除/无效',
  `sort` int(11) DEFAULT '100',
  `is_recom` tinyint(1) DEFAULT '0' COMMENT '是否推荐',
  `add_time` int(11) DEFAULT NULL,
  `del_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_video
-- ----------------------------
INSERT INTO `lm_video` VALUES ('1', 'upload/video/wenjun.mp3', '官方默认', '0', '1', '1', '0', '1558951906', null);
INSERT INTO `lm_video` VALUES ('3', 'upload/video/hyzxk.mp3', '回忆总想哭', '0', '1', '5', '0', '1558951906', null);
INSERT INTO `lm_video` VALUES ('6', 'upload/video/yshskl.mp3', '忧伤还是快乐', '0', '1', '2', '0', '1558951906', null);
INSERT INTO `lm_video` VALUES ('5', 'upload/video/tkzc.mp3', '天空之城', '0', '1', '3', '0', '1558951906', null);
INSERT INTO `lm_video` VALUES ('8', 'upload/video/nydyxf.mp3', '你一定要幸福', '0', '1', '8', '0', '1558951906', null);
INSERT INTO `lm_video` VALUES ('7', 'upload/video/ghyjn.mp3', '刚好遇见你', '0', '1', '4', '0', '1558951906', null);
INSERT INTO `lm_video` VALUES ('9', 'upload/video/ssjs.mp3', '说散就散', '0', '1', '14', '0', '1558951906', null);
INSERT INTO `lm_video` VALUES ('10', 'upload/video/td.mp3', '太多', '0', '1', '15', '0', '1558951906', null);
INSERT INTO `lm_video` VALUES ('11', 'upload/video/yhldca.mp3', '烟火里的尘埃', '0', '1', '6', '0', '1558951906', null);
INSERT INTO `lm_video` VALUES ('12', 'upload/video/zmdqd.mp3', '最美的期待', '0', '1', '16', '0', '1558951906', null);
INSERT INTO `lm_video` VALUES ('13', 'upload/video/ydt.mp3', '有点甜', '0', '1', '7', '0', '1558951906', null);
INSERT INTO `lm_video` VALUES ('14', 'upload/video/gk.mp3', '过客', '0', '1', '9', '0', '1558951906', null);
INSERT INTO `lm_video` VALUES ('15', 'upload/video/ls.mp3', '绿色', '0', '1', '10', '0', '1558951906', null);
INSERT INTO `lm_video` VALUES ('16', 'upload/video/dyfz.mp3', '等一分钟', '0', '1', '11', '0', '1558951906', null);
INSERT INTO `lm_video` VALUES ('17', 'upload/video/zmjhb.mp3', '咱们结婚吧', '0', '1', '12', '0', '1558951906', null);
INSERT INTO `lm_video` VALUES ('18', 'upload/video/yqxs.mp3', '一曲相思', '0', '1', '13', '0', '1558951906', null);

-- ----------------------------
-- Table structure for lm_xp
-- ----------------------------
DROP TABLE IF EXISTS `lm_xp`;
CREATE TABLE `lm_xp` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0',
  `toUser` varchar(255) DEFAULT NULL,
  `fromUser` varchar(255) DEFAULT NULL,
  `text` text,
  `img` varchar(255) DEFAULT NULL,
  `is_recom` tinyint(1) DEFAULT '0' COMMENT '是否为分享相册',
  `click` int(11) DEFAULT '0' COMMENT '点赞数',
  `sort` int(11) DEFAULT '100' COMMENT '排序',
  `isshow` tinyint(1) DEFAULT '1' COMMENT '是否显示',
  `isok` tinyint(1) DEFAULT '1' COMMENT '是否被删除/无效',
  `loveCatId` int(11) DEFAULT '0' COMMENT '相册ID，0为默认相册',
  `sharerCatId` int(11) DEFAULT '0' COMMENT '属于哪个锦集，0代表没有在锦集里面',
  `add_time` int(11) DEFAULT NULL,
  `del_time` int(11) DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=111 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_xp
-- ----------------------------
INSERT INTO `lm_xp` VALUES ('110', '2', '', '', '爱无非是，\n初见你心晴，\n久见你心安。', 'upload/love/2/20190527/2019052715505647947.jpg', '0', '0', '100', '1', '1', '0', '0', '1558943468', null);
INSERT INTO `lm_xp` VALUES ('108', '2', '', '', '你是夏日风雨，\n冬日里的暖阳，\n温柔了岁月，也惊艳了时光。', 'upload/love/2/20190527/2019052715271296883.jpg', '0', '0', '100', '1', '1', '0', '0', '1558942039', null);
INSERT INTO `lm_xp` VALUES ('109', '2', null, null, '知道不该打扰你，\n但每次看到你的背影，\n都不再忍下决心。', 'upload/love/2/20190527/2019052715492967091.jpg', '0', '0', '100', '1', '1', '0', '0', '1558943381', null);
