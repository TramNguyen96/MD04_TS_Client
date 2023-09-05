import React from 'react'

export default function DropDown() {
    function changeLanguage(lang: string) {
        localStorage.setItem("locales", lang);
        window.location.reload();
    }
    return (
        <div className="dropdown" style={{ position: 'absolute', bottom: '5%', right: '0', zIndex: '100' }}>
            <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
                style={{ backgroundColor: 'blue' }}
            >
                Language
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><span onClick={() => {
                    changeLanguage('vi')
                }} className="dropdown-item">Tiếng Việt</span></li>
                <li><span onClick={() => {
                    changeLanguage('en')
                }} className="dropdown-item">Tiếng Anh</span></li>
            </ul>
        </div>
    )
}