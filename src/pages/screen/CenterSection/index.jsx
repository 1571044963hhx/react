import './index.scss'
import { MyIcon } from '@/assets/icons/myIcon';

const CenterSection = () => {
    return (
        <div className="center-section">
            <div className="center-top">
                <div className='basicInfo'>
                    <table>
                        <tr>
                            <td>姓名:黄洪鑫 </td>
                            <td>毕业院校：兰州大学 </td>
                            <td rowSpan='4'>照片</td>
                        </tr>
                        <tr>
                            <td>年龄:24 </td>
                            <td>专业：地图学与地理信息系统 </td>
                        </tr>
                        <tr>
                            <td>求职岗位：前端开发 </td>
                            <td>联系电话：18770632553 </td>
                        </tr>
                        <tr>
                            <td>期望城市：深圳</td>
                            <td>联系邮箱：1571044963@qq.com </td>
                        </tr>
                        <tr>
                            {/* <MyIcon className="icon" type="icon-shuaxin1" style={{ fontSize: '20px' }} /> */}
                            <td className="merged" colspan="3">专业技能</td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                1. 精通 HTML、CSS(SCSS)、JavaScript 等前端开发技术，熟悉H5、C3及ES6新语法特性;<br />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                2. 熟练使用 Vue、pinia、Vue-Router、React、redux、React-Router 进行项目开发;<br />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                3. 熟练掌握 TypeScript 语法，能配合主流前端框架进行项目开发;<br />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                4. 熟练使用 Element UI/Plus、Echarts、Antd、Vant等前端组件库进行项目开发;<br />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                5. 熟练使用 uniapp 开发小程序;<br />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                6. 熟悉 express 搭建服务器，对node.js有一定的了解;<br />
                            </td>
                        </tr>
                        <tr>
                            <td className="merged" colspan="3">项目经历</td>
                        </tr>
                        <tr>
                            <td className='bold'>后台管理系统</td>
                            <td>前端开发工程师</td>
                            <td>2024-02至2024-04 </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                功能介绍：通过角色权限的下发来实现各级部门的主管，员工等多用户的分权限管理方案，使用此系统可以实时修改公司产品属性信息以及查看产品销售情况。
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                技术栈：Vue+Pinia+Vue-Router+React+Redux+React-Router+Ajax+Ts
                            </td>
                        </tr>
                        <tr>
                            <td className='bold'>商城平台小程序</td>
                            <td>前端开发工程师</td>
                            <td>2024-04至2024-06 </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                功能介绍：用于鲜花的选购，包含交互、支付、文件上传、地图定位、网络请求、存储等功能。
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                1. 采用小程序内置组件并结合`Vant`组件库搭建页面结构(样式：scss);
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                2. 小程序内置`API`：交互、支付、文件上传、地图定位、网络请求、存储等;
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                3. 自定义封装request方法，快捷方式封装、请求/响应拦截器;
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                4. 使用了licia库进行了防抖节流操作，async-validator实现表单验证，mobx-miniprogram进行项目状态管理;
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                5. 使用腾讯地图服务进行 `LBS`逆地址解析，实现选择收货地址功能;
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                6. 使用分包加载，自定义组件等方式提高小程序的效率;
                            </td>
                        </tr>
                        <tr>
                            <td className="merged" colspan="3">教育背景</td>
                        </tr>
                        <tr>
                            <td>海南大学</td>
                            <td>人文地理与城乡规划</td>
                            <td>2018-09至2022-06</td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                1.SCI 二区论文一篇，采用JavaScript、python、matlab分析数据；
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                2.连续两年获得研究生奖学金（专业排名第二），英语六级500+
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                3.GIS二级等级证书、能够使用ARCGIS、ENVI等遥感图像处理软件以及PS、origin等图像编辑软件;
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CenterSection;
