import './Admin.scss'
import ManagerProduct from './ManagerProducts/ManagerProduct'
import ManagerReceipt from './ManagerReceipts/ManagerReceipt'
import ManagerUser from './ManagerUsers/ManagerUser'

export default function Admin() {
    return (
        <div>
            <>
                {/* Tabs navs */}
                <ul className="nav nav-pills mb-3 admin" id="ex-with-icons" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a href="/" >
                            <i className="fa-solid fa-house" style={{ marginRight: '2em', marginTop: '1.5em' }}></i>
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a
                            className="nav-link active"
                            id="ex-with-icons-tab-1"
                            data-mdb-toggle="tab"
                            href="#ex-with-icons-tabs-1"
                            role="tab"
                            aria-controls="ex-with-icons-tabs-1"
                            aria-selected="true"
                        >
                            <i className="fa-solid fa-cube"></i>
                            <span>  PRODUCTS</span>

                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a
                            className="nav-link"
                            id="ex-with-icons-tab-2"
                            data-mdb-toggle="tab"
                            href="#ex-with-icons-tabs-2"
                            role="tab"
                            aria-controls="ex-with-icons-tabs-2"
                            aria-selected="false"
                        >
                            <i className="fa-solid fa-users"></i>
                            <span>  USER</span>
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a
                            className="nav-link"
                            id="ex-with-icons-tab-3"
                            data-mdb-toggle="tab"
                            href="#ex-with-icons-tabs-3"
                            role="tab"
                            aria-controls="ex-with-icons-tabs-3"
                            aria-selected="false"
                        >
                            <i className="fa-solid fa-file-invoice-dollar"></i>
                            <span>  RECEIPT</span>
                        </a>
                    </li>
                </ul>
                {/* Tabs navs */}
                {/* Tabs content */}
                <div className="tab-content" id="ex-with-icons-content">
                    <div
                        className="tab-pane fade show active"
                        id="ex-with-icons-tabs-1"
                        role="tabpanel"
                        aria-labelledby="ex-with-icons-tab-1"
                    >
                        <ManagerProduct />
                    </div>
                    <div
                        className="tab-pane fade"
                        id="ex-with-icons-tabs-2"
                        role="tabpanel"
                        aria-labelledby="ex-with-icons-tab-2"
                    >
                        <ManagerUser />
                    </div>
                    <div
                        className="tab-pane fade"
                        id="ex-with-icons-tabs-3"
                        role="tabpanel"
                        aria-labelledby="ex-with-icons-tab-3"
                    >
                        <ManagerReceipt />
                    </div>
                </div>
                {/* Tabs content */}
            </>

        </div>
    )
}
