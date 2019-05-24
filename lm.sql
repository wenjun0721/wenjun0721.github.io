/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : lm

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2019-05-24 19:41:40
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
INSERT INTO `lm_background` VALUES ('1', 'upload/background/1.jpg', '甜蜜', '0', '0', '0', '101', '1', '1', '0', '0', '1', null, '1523486289', null);
INSERT INTO `lm_background` VALUES ('2', 'upload/background/2.jpg', '回忆', '0', '0', '1', '100', '1', '1', '0', '10', '1', null, '1568315237', null);
INSERT INTO `lm_background` VALUES ('3', 'upload/background/3.jpg', '爱', '0', '0', '0', '100', '1', '1', '0', '0', '1', null, '1523698752', null);

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
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_collection
-- ----------------------------
INSERT INTO `lm_collection` VALUES ('6', '24', '1', '1', '1', '100', '1523587129', '0');
INSERT INTO `lm_collection` VALUES ('7', '25', '1', '1', '0', '100', '1558492430', '1558492431');

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
) ENGINE=MyISAM AUTO_INCREMENT=93 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_sharer
-- ----------------------------
INSERT INTO `lm_sharer` VALUES ('24', '1', '测试锦集', '1', '1', '1', 'D:\\phpStudy\\WWW\\lm2\\upload/qrcode/1/20190513\\24.png', '10', '13', 'upload/love/2019042516594949842.jpg', '0', '100', '1', '1557298900', null);
INSERT INTO `lm_sharer` VALUES ('25', '1', '测试锦集2', '1', '1', '1', null, '7', '5', 'upload/love/2019042515373776577.jpg', '0', '100', '1', '1557299388', null);
INSERT INTO `lm_sharer` VALUES ('81', '2', '测试', '1', '1', '0', null, '0', '0', null, '0', '100', '1', '1558523949', null);
INSERT INTO `lm_sharer` VALUES ('86', '2', '524', '1', '1', '0', null, '0', '0', null, '0', '100', '1', '1558689244', null);
INSERT INTO `lm_sharer` VALUES ('89', '2', '555', '1', '1', '0', null, '0', '0', null, '0', '100', '1', '1558692819', null);
INSERT INTO `lm_sharer` VALUES ('90', '2', '测试123', '1', '1', '0', null, '0', '0', null, '0', '100', '1', '1558694343', null);
INSERT INTO `lm_sharer` VALUES ('91', '2', '1111', '1', '1', '0', null, '0', '0', null, '0', '100', '1', '1558694456', null);
INSERT INTO `lm_sharer` VALUES ('92', '2', '锦集2', '3', '1', '0', null, '0', '0', null, '0', '100', '1', '1558694927', null);

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
) ENGINE=MyISAM AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_sharer_img
-- ----------------------------
INSERT INTO `lm_sharer_img` VALUES ('59', '25', '1', '90', 'upload/love/2019042418053888860.jpg', '3', '1', '0', '1', '1557299397', null);
INSERT INTO `lm_sharer_img` VALUES ('60', '25', '1', '92', 'upload/love/2019042515373776577.jpg', '2', '1', '0', '1', '1557299398', null);
INSERT INTO `lm_sharer_img` VALUES ('61', '90', '2', '106', 'upload/love/20190524/2019052416130487429.jpg', '5', '1', '0', '1', '1558694343', null);
INSERT INTO `lm_sharer_img` VALUES ('62', '90', '2', '101', 'upload/love/20190524/2019052415265980236.jpg', '4', '1', '0', '1', '1558694343', null);
INSERT INTO `lm_sharer_img` VALUES ('63', '90', '2', '100', 'upload/love/20190524/2019052415264488360.jpg', '3', '1', '0', '1', '1558694343', null);
INSERT INTO `lm_sharer_img` VALUES ('53', '24', '1', '78', 'upload/love/2019041717492378989.jpg', '5', '1', '0', '1', '1557298916', null);
INSERT INTO `lm_sharer_img` VALUES ('54', '24', '1', '81', 'upload/love/2019041717534098169.jpg', '4', '1', '0', '1', '1557298917', null);
INSERT INTO `lm_sharer_img` VALUES ('55', '24', '1', '85', 'upload/love/2019041717562219374.jpg', '3', '1', '0', '1', '1557298918', null);
INSERT INTO `lm_sharer_img` VALUES ('56', '24', '1', '93', 'upload/love/2019042516594949842.jpg', '1', '1', '0', '1', '1557298919', null);
INSERT INTO `lm_sharer_img` VALUES ('57', '24', '1', '94', 'upload/love/20190508/2019050814504624727.jpg', '2', '1', '0', '1', '1557298920', null);
INSERT INTO `lm_sharer_img` VALUES ('58', '25', '1', '89', 'upload/love/2019042418001368071.jpg', '1', '1', '0', '1', '1557299396', null);
INSERT INTO `lm_sharer_img` VALUES ('64', '90', '2', '99', 'upload/love/20190522/2019052219002196823.jpg', '2', '1', '0', '1', '1558694343', null);
INSERT INTO `lm_sharer_img` VALUES ('65', '90', '2', '98', 'upload/love/20190508/2019050816052173325.jpg', '1', '1', '0', '1', '1558694343', null);
INSERT INTO `lm_sharer_img` VALUES ('66', '92', '2', '106', 'upload/love/20190524/2019052416130487429.jpg', '5', '1', '0', '1', '1558694927', null);
INSERT INTO `lm_sharer_img` VALUES ('67', '92', '2', '101', 'upload/love/20190524/2019052415265980236.jpg', '4', '1', '0', '1', '1558694927', null);
INSERT INTO `lm_sharer_img` VALUES ('68', '92', '2', '100', 'upload/love/20190524/2019052415264488360.jpg', '1', '1', '0', '1', '1558694927', null);
INSERT INTO `lm_sharer_img` VALUES ('69', '92', '2', '99', 'upload/love/20190522/2019052219002196823.jpg', '3', '1', '0', '1', '1558694927', null);
INSERT INTO `lm_sharer_img` VALUES ('70', '92', '2', '98', 'upload/love/20190508/2019050816052173325.jpg', '2', '1', '0', '1', '1558694927', null);
INSERT INTO `lm_sharer_img` VALUES ('71', '92', '2', '103', 'upload/love/20190524/2019052415453312853.jpg', '100', '1', '0', '0', '1558697648', '1558697926');
INSERT INTO `lm_sharer_img` VALUES ('72', '92', '2', '95', 'upload/love/20190508/2019050815204110812.jpg', '100', '1', '0', '1', '1558697744', null);
INSERT INTO `lm_sharer_img` VALUES ('73', '92', '2', '104', 'upload/love/20190524/2019052416121872941.jpg', '100', '1', '0', '1', '1558697780', null);
INSERT INTO `lm_sharer_img` VALUES ('74', '92', '2', '96', 'upload/love/20190508/2019050815390185081.jpg', '100', '1', '0', '1', '1558697878', null);
INSERT INTO `lm_sharer_img` VALUES ('75', '92', '2', '102', 'upload/love/20190524/2019052415304163753.jpg', '100', '1', '0', '1', '1558697890', null);
INSERT INTO `lm_sharer_img` VALUES ('76', '92', '2', '97', 'upload/love/20190508/2019050815531041992.jpg', '100', '1', '0', '0', '1558697940', '1558697949');

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
INSERT INTO `lm_users` VALUES ('1', '句号。', '广东茂名', 'http://thirdwx.qlogo.cn/mmopen/vi_32/b1wvblgVe3A3uM0ANtZw2tQHiaFGdQDMVEWxQe3SIEK0ZPCxsbbbKhbF3p4LdbsWaem2D0InibXXiaRp6KM0k4H5A/132', '1', '123', '456', '1', '1567852367', null);
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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lm_video
-- ----------------------------
INSERT INTO `lm_video` VALUES ('1', 'upload/video/wenjun.mp3', '官方默认', '0', '1', '99', '0', '1523686210', null);
INSERT INTO `lm_video` VALUES ('2', 'upload/video/phh.mp3', '我上传的', '1', '1', '100', '0', '1538268210', '0');
INSERT INTO `lm_video` VALUES ('3', 'upload/video/zwj.mp3', '官方测试', '0', '1', '100', '0', '1583982156', '0');
INSERT INTO `lm_video` VALUES ('4', 'upload/video/1/20190520/155835381136513.mp4', 'aa', '1', '0', '100', '0', '1558353815', null);

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
) ENGINE=MyISAM AUTO_INCREMENT=107 DEFAULT CHARSET=utf8;

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
INSERT INTO `lm_xp` VALUES ('95', '2', '测试2', '测试3', '15点19分钟38秒', 'upload/love/20190508/2019050815204110812.jpg', '0', '0', '100', '1', '1', '0', '92', '1557300043', null);
INSERT INTO `lm_xp` VALUES ('96', '2', '测试3', null, '加油努力', 'upload/love/20190508/2019050815390185081.jpg', '0', '0', '100', '1', '1', '0', '92', '1557301145', null);
INSERT INTO `lm_xp` VALUES ('97', '2', '测试添加1', '测试添加2', '搜索啊啊是的', 'upload/love/20190508/2019050815531041992.jpg', '0', '0', '100', '1', '1', '0', '0', '1557302456', null);
INSERT INTO `lm_xp` VALUES ('98', '2', 'wj', 'zwj', '测试的', 'upload/love/20190508/2019050816052173325.jpg', '0', '0', '100', '1', '1', '0', '0', '1557302723', null);
INSERT INTO `lm_xp` VALUES ('99', '2', '测试', '123', '123', 'upload/love/20190522/2019052219002196823.jpg', '0', '0', '100', '1', '1', '0', '0', '1558522822', null);
INSERT INTO `lm_xp` VALUES ('100', '2', '测试', '2', '123456', 'upload/love/20190524/2019052415264488360.jpg', '0', '0', '100', '1', '1', '0', '0', '1558682806', null);
INSERT INTO `lm_xp` VALUES ('101', '2', '阿萨德', '阿萨德', '阿诗丹顿艾斯德斯 阿萨德啊阿萨德 阿萨德', 'upload/love/20190524/2019052415265980236.jpg', '0', '0', '100', '1', '1', '0', '0', '1558682830', null);
INSERT INTO `lm_xp` VALUES ('102', '2', '阿萨德', null, '阿诗丹顿阿萨德阿萨德', 'upload/love/20190524/2019052415304163753.jpg', '0', '0', '100', '1', '1', '1', '92', '1558683050', null);
INSERT INTO `lm_xp` VALUES ('103', '2', '啊的', '萨顶顶', '撒倒萨大飒飒的大师', 'upload/love/20190524/2019052415453312853.jpg', '0', '0', '100', '1', '1', '1', '0', '1558683934', null);
INSERT INTO `lm_xp` VALUES ('104', '2', 'asd ', 'asd', 'asd', 'upload/love/20190524/2019052416121872941.jpg', '0', '0', '100', '1', '1', '1', '92', '1558685539', null);
INSERT INTO `lm_xp` VALUES ('105', '2', 'csad', 'ads', 'asd', 'upload/love/20190524/2019052416124092640.jpg', '0', '0', '100', '1', '1', '1', '0', '1558685563', null);
INSERT INTO `lm_xp` VALUES ('106', '2', 'asd', 'ads', 'asd', 'upload/love/20190524/2019052416130487429.jpg', '0', '0', '100', '1', '1', '0', '0', '1558685585', null);
