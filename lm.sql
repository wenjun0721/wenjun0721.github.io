/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : lm

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2019-05-21 19:28:38
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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_background
-- ----------------------------
INSERT INTO `lm_background` VALUES ('1', 'upload/background/1.jpg', '甜蜜', '0', '0', '0', '101', '1', '1', '1', '0', '1', null, '1523486289', null);
INSERT INTO `lm_background` VALUES ('2', 'upload/background/2.jpg', '回忆', '0', '0', '1', '100', '1', '1', '1', '10', '1', null, '1568315237', null);
INSERT INTO `lm_background` VALUES ('3', 'upload/background/3.jpg', '爱', '0', '0', '0', '100', '1', '1', '1', '0', '1', null, '1523698752', null);

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
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_background_cat
-- ----------------------------
INSERT INTO `lm_background_cat` VALUES ('1', '0', '粉色回忆', '100', '0', '1', '1', '1523568712', null);
INSERT INTO `lm_background_cat` VALUES ('2', '0', '甜甜蜜蜜', '100', '0', '1', '1', '1523675892', null);
INSERT INTO `lm_background_cat` VALUES ('10', '1', '我的努力', '100', '0', '1', '1', '1557793524', null);

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
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_collection
-- ----------------------------
INSERT INTO `lm_collection` VALUES ('6', '24', '1', '1', '1', '100', '1523587129', '0');

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_sharer
-- ----------------------------
INSERT INTO `lm_sharer` VALUES ('24', '1', '测试锦集', '1', '1', '1', 'D:\\phpStudy\\WWW\\lm2\\upload/qrcode/1/20190513\\24.png', '6', '13', 'upload/love/2019042516594949842.jpg', '0', '100', '1', '1557298900', null);
INSERT INTO `lm_sharer` VALUES ('25', '1', '测试锦集2', '1', '1', '1', null, '5', '3', 'upload/love/2019042515373776577.jpg', '0', '100', '1', '1557299388', null);

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
) ENGINE=MyISAM AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_sharer_img
-- ----------------------------
INSERT INTO `lm_sharer_img` VALUES ('59', '25', '1', '90', 'upload/love/2019042418053888860.jpg', '3', '1', '0', '1', '1557299397', null);
INSERT INTO `lm_sharer_img` VALUES ('60', '25', '1', '92', 'upload/love/2019042515373776577.jpg', '2', '1', '0', '1', '1557299398', null);
INSERT INTO `lm_sharer_img` VALUES ('53', '24', '1', '78', 'upload/love/2019041717492378989.jpg', '5', '1', '0', '1', '1557298916', null);
INSERT INTO `lm_sharer_img` VALUES ('54', '24', '1', '81', 'upload/love/2019041717534098169.jpg', '4', '1', '0', '1', '1557298917', null);
INSERT INTO `lm_sharer_img` VALUES ('55', '24', '1', '85', 'upload/love/2019041717562219374.jpg', '3', '1', '0', '1', '1557298918', null);
INSERT INTO `lm_sharer_img` VALUES ('56', '24', '1', '93', 'upload/love/2019042516594949842.jpg', '1', '1', '0', '1', '1557298919', null);
INSERT INTO `lm_sharer_img` VALUES ('57', '24', '1', '94', 'upload/love/20190508/2019050814504624727.jpg', '2', '1', '0', '1', '1557298920', null);
INSERT INTO `lm_sharer_img` VALUES ('58', '25', '1', '89', 'upload/love/2019042418001368071.jpg', '1', '1', '0', '1', '1557299396', null);

-- ----------------------------
-- Table structure for lm_users
-- ----------------------------
DROP TABLE IF EXISTS `lm_users`;
CREATE TABLE `lm_users` (
  `userId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `userAddress` varchar(255) DEFAULT NULL,
  `userImg` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `openId` varchar(255) DEFAULT NULL,
  `unionId` varchar(255) DEFAULT NULL,
  `add_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_users
-- ----------------------------
INSERT INTO `lm_users` VALUES ('1', '句号。', '广东茂名', 'http://thirdwx.qlogo.cn/mmopen/vi_32/b1wvblgVe3A3uM0ANtZw2tQHiaFGdQDMVEWxQe3SIEK0ZPCxsbbbKhbF3p4LdbsWaem2D0InibXXiaRp6KM0k4H5A/132', '1', '123', '456', '1567852367');

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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_video
-- ----------------------------
INSERT INTO `lm_video` VALUES ('1', 'upload/video/wenjun.mp3', '官方默认', '1', '1', '99', '0', '1523686210', null);
INSERT INTO `lm_video` VALUES ('2', 'upload/video/phh.mp3', '我上传的', '1', '1', '100', '0', '1538268210', '1558349264');
INSERT INTO `lm_video` VALUES ('3', 'upload/video/zwj.mp3', '官方测试', '1', '1', '100', '0', '1583982156', '1558349340');
INSERT INTO `lm_video` VALUES ('4', 'upload/video/1/20190520/155835381136513.mp4', 'aa', '1', '0', '100', '0', '1558353815', '1558353856');

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
) ENGINE=MyISAM AUTO_INCREMENT=99 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_xp
-- ----------------------------
INSERT INTO `lm_xp` VALUES ('78', '1', '夏日', '冬阳', '你是夏日风雨,\r\n冬日里的暖阳，\r\n温柔了岁月，惊艳了时光。', 'upload/love/2019041717492378989.jpg', '0', '0', '50', '1', '1', '0', '24', '1555494563', null);
INSERT INTO `lm_xp` VALUES ('81', '1', '心晴', '心安', '爱无非是,\r\n初见你心晴，\r\n久见你心安。', 'upload/love/2019041717534098169.jpg', '0', '0', '50', '1', '1', '0', '24', '1555494820', null);
INSERT INTO `lm_xp` VALUES ('85', '1', '背影', '决心', '知道不该打扰你,\r\n但每次偷看你背影，\r\n都不忍再下决心。', 'upload/love/2019041717562219374.jpg', '0', '0', '50', '1', '1', '0', '24', '1555494982', null);
INSERT INTO `lm_xp` VALUES ('89', '1', '测试的', '写给你的', '致最爱的您！！！', 'upload/love/2019042418001368071.jpg', '0', '0', '50', '1', '1', '0', '25', '1556100015', null);
INSERT INTO `lm_xp` VALUES ('90', '1', '测试2', '开心', '每一天', 'upload/love/2019042418053888860.jpg', '0', '0', '50', '1', '1', '0', '25', '1556100341', '0');
INSERT INTO `lm_xp` VALUES ('92', '1', '测试一下', '我自己写的', '给自己加油，不要后悔太多！', 'upload/love/2019042515373776577.jpg', '0', '0', '50', '1', '1', '0', '25', '1556177874', '0');
INSERT INTO `lm_xp` VALUES ('93', '1', '小鱼儿', '花无缺', '爱无非是，\n初见你心情，\n久见你心安！', 'upload/love/2019042516594949842.jpg', '0', '0', '50', '1', '1', '0', '24', '1556182790', null);
INSERT INTO `lm_xp` VALUES ('94', '1', '测试', '测试1', '5月7号了啊', 'upload/love/20190508/2019050814504624727.jpg', '0', '0', '100', '1', '1', '0', '24', '1557298253', null);
INSERT INTO `lm_xp` VALUES ('95', '1', '测试2', '测试3', '15点19分钟38秒', 'upload/love/20190508/2019050815204110812.jpg', '0', '0', '100', '1', '1', '0', '0', '1557300043', null);
INSERT INTO `lm_xp` VALUES ('96', '1', '测试3', null, '加油努力', 'upload/love/20190508/2019050815390185081.jpg', '0', '0', '100', '1', '1', '0', '0', '1557301145', null);
INSERT INTO `lm_xp` VALUES ('97', '1', '测试添加1', '测试添加2', '搜索啊啊是的', 'upload/love/20190508/2019050815531041992.jpg', '0', '0', '100', '1', '1', '0', '0', '1557302456', null);
INSERT INTO `lm_xp` VALUES ('98', '1', 'wj', 'zwj', '测试的', 'upload/love/20190508/2019050816052173325.jpg', '0', '0', '100', '1', '1', '0', '0', '1557302723', null);
