import { http, createOption } from './http';


/**
 * @description 获取权限路由列表
 */
function getJurisdictionList(data) {
    let option = createOption('post', '/jurisdiction');
    option.data = data;
    return http( option );

}


export { getJurisdictionList };