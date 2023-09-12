import AutoPlay from '@/pages/homes/components/AutoImages/AutoImage'
import Banner from '@/pages/homes/components/Banners/Banner'
import Collection from '@/pages/homes/components/Collections/Collection'
import Policy from '@/pages/homes/components/Policies/Policy'
import Collection_Disney from '@/pages/homes/components/Products/Disney/Collection_Disney'
import ListProduct from '@/pages/homes/components/Products/ListProducts/ListProduct'

export default function HomeBody() {
    return (
        <div>
            <Banner />
            <Policy />
            <Collection />
            {/* <Collection_Disney /> */}
            {/* <ListProduct /> */}
            <AutoPlay />
        </div>
    )
}
