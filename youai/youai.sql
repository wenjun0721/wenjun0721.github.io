/*
Navicat MySQL Data Transfer

Source Server         : Y有爱数据库
Source Server Version : 50617
Source Host           : localhost:3307
Source Database       : youai

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2017-04-26 17:56:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `ya_admin`
-- ----------------------------
DROP TABLE IF EXISTS `ya_admin`;
CREATE TABLE `ya_admin` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `password` char(32) DEFAULT NULL,
  `groupid` int(8) DEFAULT NULL,
  `realname` varchar(30) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `addtime` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ya_admin
-- ----------------------------
INSERT INTO `ya_admin` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '1', '黄黄黄', '12345678909', '1456565656');
INSERT INTO `ya_admin` VALUES ('2', 'a', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('3', 'b', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('4', 'c', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('5', 'd', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('6', 'ef', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('7', 'g', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('8', 'h', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('9', 'j', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('10', 'i', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('11', 'k', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('12', 'l', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('13', 'm', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('14', 'n', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('15', 'o', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('16', 'p', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('17', 'q', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('18', 'r', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('19', 's', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('20', 't', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('21', 'v', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('22', 'u', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('23', 'w', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('24', 'x', null, null, null, null, null);
INSERT INTO `ya_admin` VALUES ('27', 'dddd', 'e10adc3949ba59abbe56e057f20f883e', '1', 'wwer', 'wer', '1492159316');
INSERT INTO `ya_admin` VALUES ('28', 'rtrtrtrt', 'e10adc3949ba59abbe56e057f20f883e', '1', 'dfghj11112', '123456', '1492505390');
INSERT INTO `ya_admin` VALUES ('29', 'adminnews', 'e10adc3949ba59abbe56e057f20f883e', '1', 'sdf ', '234234234', '1493016198');

-- ----------------------------
-- Table structure for `ya_case`
-- ----------------------------
DROP TABLE IF EXISTS `ya_case`;
CREATE TABLE `ya_case` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `thumb` varchar(100) DEFAULT NULL,
  `addtime` int(10) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ya_case
-- ----------------------------
INSERT INTO `ya_case` VALUES ('1', '正商上海市成功', null, 'images/case_1.jpg', null, null);
INSERT INTO `ya_case` VALUES ('2', '正商北京市成功案例11', null, 'images/case_2.jpg', null, null);
INSERT INTO `ya_case` VALUES ('3', '正商重庆市成功案例22', null, 'images/case_3.jpg', null, null);
INSERT INTO `ya_case` VALUES ('4', '正商红溪谷成功案例33', null, 'images/case_4.jpg', null, null);

-- ----------------------------
-- Table structure for `ya_category`
-- ----------------------------
DROP TABLE IF EXISTS `ya_category`;
CREATE TABLE `ya_category` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `catname` varchar(20) DEFAULT NULL,
  `enname` varchar(20) DEFAULT NULL,
  `pid` int(8) DEFAULT NULL,
  `mid` int(8) DEFAULT NULL,
  `cattype` varchar(20) DEFAULT NULL,
  `level` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ya_category
-- ----------------------------
INSERT INTO `ya_category` VALUES ('1', '国内新闻', null, '5', '1', 'News', '2');
INSERT INTO `ya_category` VALUES ('2', '国外新闻', null, '5', '1', 'News', '2');
INSERT INTO `ya_category` VALUES ('3', '鞋子', null, '6', '2', 'Product', '2');
INSERT INTO `ya_category` VALUES ('4', '关于三融', 'About us', '0', '3', 'Page', '1');
INSERT INTO `ya_category` VALUES ('5', '新闻中心', 'News', '0', '1', 'News', '1');
INSERT INTO `ya_category` VALUES ('6', '产品中心', null, '0', '2', 'Product', '1');
INSERT INTO `ya_category` VALUES ('7', '社会', null, '2', null, 'News', '3');
INSERT INTO `ya_category` VALUES ('8', '公司介绍', null, '4', null, 'Page', '2');
INSERT INTO `ya_category` VALUES ('9', '企业文化', null, '4', null, 'Page', '2');
INSERT INTO `ya_category` VALUES ('10', '我们的优势', null, '4', null, 'Page', '2');

-- ----------------------------
-- Table structure for `ya_class`
-- ----------------------------
DROP TABLE IF EXISTS `ya_class`;
CREATE TABLE `ya_class` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `classname` varchar(20) DEFAULT NULL,
  `teacher` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ya_class
-- ----------------------------
INSERT INTO `ya_class` VALUES ('1', '一班', '刘德');
INSERT INTO `ya_class` VALUES ('2', '二班', '张学');
INSERT INTO `ya_class` VALUES ('3', '三班', '郭富');
INSERT INTO `ya_class` VALUES ('4', '四班', '黎明');

-- ----------------------------
-- Table structure for `ya_group`
-- ----------------------------
DROP TABLE IF EXISTS `ya_group`;
CREATE TABLE `ya_group` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `rule` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ya_group
-- ----------------------------
INSERT INTO `ya_group` VALUES ('1', '超级管理员', '1,2,4');
INSERT INTO `ya_group` VALUES ('2', '新闻编辑员', null);
INSERT INTO `ya_group` VALUES ('3', '产品组', null);
INSERT INTO `ya_group` VALUES ('4', 'sddds', '1,4');

-- ----------------------------
-- Table structure for `ya_module`
-- ----------------------------
DROP TABLE IF EXISTS `ya_module`;
CREATE TABLE `ya_module` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `enname` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ya_module
-- ----------------------------
INSERT INTO `ya_module` VALUES ('1', '新闻', 'News');
INSERT INTO `ya_module` VALUES ('2', '产品', 'Product');
INSERT INTO `ya_module` VALUES ('3', '单页', 'Page');

-- ----------------------------
-- Table structure for `ya_news`
-- ----------------------------
DROP TABLE IF EXISTS `ya_news`;
CREATE TABLE `ya_news` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `from` varchar(30) NOT NULL,
  `content` text,
  `addtime` int(10) DEFAULT NULL,
  `thumb` varchar(150) DEFAULT NULL,
  `ftitle` varchar(200) DEFAULT NULL,
  `catid` int(8) DEFAULT NULL,
  `hits` int(8) DEFAULT NULL,
  `price` decimal(8,2) DEFAULT NULL,
  `pics` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ya_news
-- ----------------------------
INSERT INTO `ya_news` VALUES ('1', '某百科现29岁“少将” 军网打假：明显是假军人', '1', '今天中午吃过午饭，笔者的一位地方朋友在微信呼唤我，并发来“某狗百科”认证的1987年出生的“少将”资料向笔者求证。', null, null, '原标题：某百科惊现29岁“少将”，军网打假：很明显是一个假军人！', '1', null, '20.00', null);
INSERT INTO `ya_news` VALUES ('3', '222', '2', '12ef', null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('5', 'c', '4', 'sdf', null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('6', 'd', '5', 'sdf', null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('7', 'e', '6', 'sdfsd', null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('8', 'f', '7', 'sdf', null, null, null, '2', null, null, null);
INSERT INTO `ya_news` VALUES ('9', 'g', '', null, null, null, null, '2', null, null, null);
INSERT INTO `ya_news` VALUES ('10', 'h', '', null, null, null, null, '2', null, null, null);
INSERT INTO `ya_news` VALUES ('11', 'i', '', null, null, null, null, '2', null, null, null);
INSERT INTO `ya_news` VALUES ('12', 'j', '', null, null, null, null, '2', null, null, null);
INSERT INTO `ya_news` VALUES ('13', 'k', '', null, null, null, null, '2', null, null, null);
INSERT INTO `ya_news` VALUES ('14', 'l', '', null, null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('15', 'm', '', null, null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('16', 'n', '', null, null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('17', 'o', '', null, null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('18', 'p', '', null, null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('19', 'q', '', null, null, null, null, '2', null, null, null);
INSERT INTO `ya_news` VALUES ('20', 'r', '', null, null, null, null, '2', null, null, null);
INSERT INTO `ya_news` VALUES ('21', 's', '', null, null, null, null, '2', null, null, null);
INSERT INTO `ya_news` VALUES ('22', 't', '', null, null, null, null, '2', null, null, null);
INSERT INTO `ya_news` VALUES ('23', 'u', '', null, null, null, null, '2', null, null, null);
INSERT INTO `ya_news` VALUES ('24', 'v', '', null, null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('25', 'w', '', null, null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('26', 'x', '', null, null, '', null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('27', 'y', '', null, null, null, null, '2', null, null, null);
INSERT INTO `ya_news` VALUES ('29', '这是一条标题111', '来源', '我是内容', '1493939393', null, '我是副标题', '2', null, null, null);
INSERT INTO `ya_news` VALUES ('30', '1113', '2222', '3333', null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('31', '1111', '2222', '3333', null, null, null, '2', null, null, null);
INSERT INTO `ya_news` VALUES ('32', 'c1111', 'c2222', 'c3333', null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('33', 'a1111', 'a2222', 'a3333', null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('34', 'b1111', 'b2222', 'b3333', null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('35', 'c1111', 'c2222', 'c3333', null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('36', 'a1111', 'a2222', 'a3333', null, null, null, '1', null, null, null);
INSERT INTO `ya_news` VALUES ('37', 'b1111', 'b2222', 'b3333', null, null, null, '2', null, null, null);
INSERT INTO `ya_news` VALUES ('39', '1111', '2222', '3333', '1111', '2222', '3333', '1', null, null, null);
INSERT INTO `ya_news` VALUES ('40', '这是一个PHP操作MYSQL的标题', '多迪', '这是内容', null, null, null, null, null, null, null);
INSERT INTO `ya_news` VALUES ('41', '这是一个PHP操作MYSQL的标题', '有爱', '这是内容', null, null, null, null, null, null, null);
INSERT INTO `ya_news` VALUES ('42', '这是一条新闻', '', '这是一条新闻这是一条新闻这是一条新闻这是一条新闻这是一条新闻这是一条新闻', null, null, null, '2', null, null, null);
INSERT INTO `ya_news` VALUES ('43', '图片上传测试', 'YOUAI', '压顶 无可奈何花落去 士大夫士大夫要<br />', '1492763591', 'Uploads/111.jpg', null, '1', null, null, null);

-- ----------------------------
-- Table structure for `ya_page`
-- ----------------------------
DROP TABLE IF EXISTS `ya_page`;
CREATE TABLE `ya_page` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `catid` int(8) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ya_page
-- ----------------------------
INSERT INTO `ya_page` VALUES ('1', '12', '企业文化万里无云星罗棋布地');
INSERT INTO `ya_page` VALUES ('2', '8', '公司介绍<br />');
INSERT INTO `ya_page` VALUES ('3', '10', '压顶地士大夫士大夫');
INSERT INTO `ya_page` VALUES ('4', '9', '佣人众人众人众人众人众人众人众人众');

-- ----------------------------
-- Table structure for `ya_role`
-- ----------------------------
DROP TABLE IF EXISTS `ya_role`;
CREATE TABLE `ya_role` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `pid` int(6) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `fun` varchar(20) DEFAULT NULL,
  `act` varchar(20) DEFAULT NULL,
  `isshow` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ya_role
-- ----------------------------
INSERT INTO `ya_role` VALUES ('1', '0', '新闻管理', 'News', null, null);
INSERT INTO `ya_role` VALUES ('2', '1', '添加新闻', 'News', 'add', '1');
INSERT INTO `ya_role` VALUES ('3', '1', '删除新闻', 'News', 'del', '0');
INSERT INTO `ya_role` VALUES ('4', '1', '修改新闻', 'News', 'edit', '0');
INSERT INTO `ya_role` VALUES ('5', '1', '新闻列表', 'News', 'index', '1');

-- ----------------------------
-- Table structure for `ya_site`
-- ----------------------------
DROP TABLE IF EXISTS `ya_site`;
CREATE TABLE `ya_site` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `cnname` varchar(30) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `valstr` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ya_site
-- ----------------------------
INSERT INTO `ya_site` VALUES ('1', '网站标题', 'seo_title', '三融');
INSERT INTO `ya_site` VALUES ('2', '底部版权', 'copyright', ' 版权所有©三融环保有限公司电话：0757-83328888<br />地址：山东省济南市经十路15982第一大道八层');

-- ----------------------------
-- Table structure for `ya_student`
-- ----------------------------
DROP TABLE IF EXISTS `ya_student`;
CREATE TABLE `ya_student` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `classid` int(2) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `yuwen` int(3) DEFAULT NULL,
  `shuxue` int(3) DEFAULT NULL,
  `yinwen` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ya_student
-- ----------------------------
INSERT INTO `ya_student` VALUES ('1', '张三', '1', '18911112222', 'abc@qq.com\r\n', '71', '81', '91');
INSERT INTO `ya_student` VALUES ('2', '李四', '2', '18933332223', 'abc1@qq.com\r\n', '72', '82', '92');
INSERT INTO `ya_student` VALUES ('3', '赵五', '3', '18911444424', 'abc2@qq.com\r\n', '73', '83', '93');
INSERT INTO `ya_student` VALUES ('4', '林六', '4', '18915555225', 'abc3@qq.com\r\n', '74', '84', '94');
INSERT INTO `ya_student` VALUES ('5', '李七', '1', '18966662226', 'abc@163.com', '75', '85', '95');
INSERT INTO `ya_student` VALUES ('6', '王八', '2', '18988882227', 'abc1@163.com', '76', '86', '96');
INSERT INTO `ya_student` VALUES ('7', '谢九', '3', '18911133338\r\n', 'abc2@163.com', '77', '87', '97');
INSERT INTO `ya_student` VALUES ('8', '黄十', '4', '18911144449\r\n', 'sdfdf@qq.com\r\n', '78', '88', '98');
INSERT INTO `ya_student` VALUES ('9', '陈十一', '1', '18911155550\r\n', 'werer@qq.com\r\n', '79', '89', '99');
INSERT INTO `ya_student` VALUES ('10', '许十二', '2', '18911116666\r\n', 'xcvxcv@qq.com\r\n', '80', '90', '100');
