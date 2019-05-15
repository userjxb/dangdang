/*
Navicat MySQL Data Transfer

Source Server         : jxb
Source Server Version : 50508
Source Host           : localhost:3306
Source Database       : dangdang

Target Server Type    : MYSQL
Target Server Version : 50508
File Encoding         : 65001

Date: 2019-05-15 08:39:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `books`
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `sid` tinyint(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `picurl` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  `author` varchar(20) NOT NULL,
  `press` varchar(50) DEFAULT NULL,
  `presstime` varchar(50) DEFAULT NULL,
  `newprice` float(10,2) NOT NULL,
  `oldprice` float(10,2) NOT NULL,
  `ebookprice` float(10,2) DEFAULT NULL,
  `piclist` varchar(999) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of books
-- ----------------------------
INSERT INTO `books` VALUES ('1', '人生海海', 'http://img3m5.ddimg.cn/51/34/26921715-1_u_2.jpg', '人生海海，何必在意一时沉浮！ 茅盾文学奖得主麦家2019强力之作，挑战常人不敢落笔之处，解密人性的荒唐与高尚。', '麦家', '北京十月文艺出版社', '2019年3月', '37.90', '55.00', '24.99', 'http://img3m5.ddimg.cn/51/34/26921715-1_x_2.jpg,http://img3m5.ddimg.cn/51/34/26921715-2_x_8.jpg,http://img3m5.ddimg.cn/51/34/26921715-3_x_1.jpg,http://img3m5.ddimg.cn/51/34/26921715-4_x_4.jpg,http://img3m5.ddimg.cn/51/34/26921715-5_x_1.jpg');
INSERT INTO `books` VALUES ('2', '妻妾成群', 'http://img3m9.ddimg.cn/58/31/26512159-1_u_3.jpg', '当代文学大家、茅盾文学奖得主苏童中篇小说代表作！一个阴郁、颓败、凄迷又诡秘的故事，见证女性生命如昙花般地绽放与凋零。苏童惊艳文坛、蜚声海内外的震撼之作！2019年精装典藏版，苏童亲写新序推荐！', '苏童', '浙江人民出版社', '2019年3月', '45.50', '48.00', null, 'http://img3m9.ddimg.cn/58/31/26512159-1_x_3.jpg,http://img3m9.ddimg.cn/58/31/26512159-2_x_6.jpg,http://img3m9.ddimg.cn/58/31/26512159-3_x_6.jpg,http://img3m9.ddimg.cn/58/31/26512159-4_x_5.jpg,http://img3m9.ddimg.cn/58/31/26512159-5_x_5.jpg,http://img3m9.ddimg.cn/58/31/26512159-6_x_5.jpg,http://img3m9.ddimg.cn/58/31/26512159-7_x_3.jpg,http://img3m9.ddimg.cn/58/31/26512159-8_x_2.jpg');
INSERT INTO `books` VALUES ('3', '短板效应', 'http://img3m8.ddimg.cn/16/29/25230958-1_u_6.jpg', '深刻阐述“贫者愈贫、富者愈富”的社会现象 为成功者趋向更大的成功提供方法，为失败者超越失败指明方向', '赵佳', '中国华侨出版社', '2018年3月', '38.20', '128.00', null, 'http://img3m8.ddimg.cn/16/29/25230958-1_x_6.jpg,http://img3m8.ddimg.cn/16/29/25230958-2_x_2.jpg');
INSERT INTO `books` VALUES ('4', '认知：所谓成长就是认知升级', 'http://img3m3.ddimg.cn/22/33/26919013-1_u_8.jpg', '简书认知KOL、顺丰高管方法论，腾讯、阿里高层内部推荐！非鸡汤，全干货，4大模块、34个方法，从思维到决策、从认知升级到格局破局，全面系统，由浅入深。突破自我、走出焦虑，这一本书就够了！', '吴建平', '中国友谊出版公司', '2019年4月', '49.50', '55.00', null, 'http://img3m3.ddimg.cn/22/33/26919013-1_x_8.jpg,http://img3m3.ddimg.cn/22/33/26919013-2_x_3.jpg,http://img3m3.ddimg.cn/22/33/26919013-3_x_3.jpg,http://img3m3.ddimg.cn/22/33/26919013-4_x_3.jpg');
INSERT INTO `books` VALUES ('5', '硅谷工程师爸爸的超强思维导图课', 'http://img3m7.ddimg.cn/52/29/26923597-1_u_5.jpg', '硅谷工程师憨爸携手美国名校教师小杨老师共同创作，“凯叔讲故事”创始人凯叔等诚意推荐，7大模块思维导图内容，融合学科学习，一支笔、一张纸即可快速提升学习力，系统训练科学思维', '小杨老师 憨爸', '中国妇女出版社', '2019年4月', '53.20', '59.80', '20.99', 'http://img3m7.ddimg.cn/52/29/26923597-1_x_5.jpg');
INSERT INTO `books` VALUES ('6', '我有预感明天也会喜欢你', 'http://img3m2.ddimg.cn/0/23/26515962-1_u_4.jpg', '（火爆微博的真实恋爱教科书，引发千万读者歆羡和转载。我发现我昨天很喜欢你，今天也很喜欢你，我有预感明天也会喜欢你。随书附赠马卡龙色告白卡+神秘恋爱锦囊+精美书签', '张一然 么么晗 白马时光', '百花洲文艺出版社', '2019年3月', '38.10', '39.80', null, 'http://img3m2.ddimg.cn/0/23/26515962-1_x_4.jpg,http://img3m2.ddimg.cn/0/23/26515962-2_x_5.jpg,http://img3m2.ddimg.cn/0/23/26515962-3_x_2.jpg,http://img3m2.ddimg.cn/0/23/26515962-4_x_3.jpg,http://img3m2.ddimg.cn/0/23/26515962-5_x_3.jpg,http://img3m2.ddimg.cn/0/23/26515962-6_x_3.jpg,http://img3m2.ddimg.cn/0/23/26515962-7_x_3.jpg');
INSERT INTO `books` VALUES ('7', '神奇树屋·科普系列.第1辑', 'http://img3m7.ddimg.cn/15/1/26515977-1_u_2.jpg', '10位专家推荐、27年持续畅销、38种语言版本、70张精美图片、100个必备知识点、1.34亿册销量、一套培养孩子逻辑思维、想象力、创造力的科普宝典', '玛丽·波·奥斯本', '新世纪出版社', '2019年3月', '126.70', '176.00', null, 'http://img3m7.ddimg.cn/15/1/26515977-1_x_2.jpg,http://img3m7.ddimg.cn/15/1/26515977-2_x_4.jpg,http://img3m7.ddimg.cn/15/1/26515977-3_x_4.jpg,http://img3m7.ddimg.cn/15/1/26515977-4_x_5.jpg,http://img3m7.ddimg.cn/15/1/26515977-5_x_7.jpg,http://img3m7.ddimg.cn/15/1/26515977-6_x_8.jpg,http://img3m7.ddimg.cn/15/1/26515977-7_x_9.jpg,http://img3m7.ddimg.cn/15/1/26515977-8_x_8.jpg');
INSERT INTO `books` VALUES ('8', '古史·文言·今论', 'http://img3m4.ddimg.cn/71/34/25168544-1_u_11.jpg', '快提分，保高分，终结文言文学习噩梦！《古史·文言·今论》赋予你征服高考文言文的能力！ 文言阅读、文化积累两手抓，为高中师生提供文言文教和学的全新解决方案。', '杨洋', '北京师范大学出版社', '2017年10月', '65.30', '68.00', null, 'http://img3m4.ddimg.cn/71/34/25168544-1_x_11.jpg,http://img3m4.ddimg.cn/71/34/25168544-2_x_9.jpg,http://img3m4.ddimg.cn/71/34/25168544-3_x_9.jpg,http://img3m4.ddimg.cn/71/34/25168544-4_x_6.jpg,http://img3m4.ddimg.cn/71/34/25168544-5_x_5.jpg');
INSERT INTO `books` VALUES ('9', '爱与热爱，让我们勇往直前', 'http://img3m7.ddimg.cn/29/31/26916347-1_u_3.jpg', '崔永元、赵忠祥力荐的明星故事！《乡村爱情》系列剧人气角色“谢大脚”于月仙与弟弟于英杰的励志成长史！在生命中*难的时刻抓住那道光……人生艰险，唯有爱能突出重围!', '于月仙 于英杰', '现代出版社', '2019年3月', '45.00', '45.00', null, 'http://img3m7.ddimg.cn/29/31/26916347-1_x_3.jpg,http://img3m7.ddimg.cn/29/31/26916347-2_x_3.jpg,http://img3m7.ddimg.cn/29/31/26916347-3_x_3.jpg,http://img3m7.ddimg.cn/29/31/26916347-4_x_3.jpg,http://img3m7.ddimg.cn/29/31/26916347-5_x_3.jpg');
INSERT INTO `books` VALUES ('10', '男人这东西', 'http://img3m2.ddimg.cn/8/19/25310942-1_u_3.jpg', '渡边淳一深度剖析男女两性价值观的异同，从男女性心理学角度撰写的两性关系读本', '渡边淳一', '青岛出版社', '2018年5月', '39.00', '39.00', null, 'http://img3m2.ddimg.cn/8/19/25310942-1_x_3.jpg,http://img3m2.ddimg.cn/8/19/25310942-2_x_3.jpg,http://img3m2.ddimg.cn/8/19/25310942-3_x_3.jpg');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `sid` tinyint(5) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `tel` varchar(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'jxb', '446a3c22b6418878ff7ce85a858128f5a3f085ac', '17742011201', '12@12.com');
INSERT INTO `user` VALUES ('2', 'test', '7c4a8d09ca3762af61e59520943dc26494f8941b', '17855834154', '123@123.com');
