import userModule from './apis/modules/user.module';
import productModule from './apis/modules/product.module';
import purchaseModule from './apis/modules/purchase.module';
import './axios.instance';

export default {
    userApi: userModule,
    productApi: productModule,
    purchaseApi: purchaseModule

}