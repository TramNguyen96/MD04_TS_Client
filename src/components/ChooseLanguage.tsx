export default function DropDown() {
    function changeLanguage(lang: string) {
        localStorage.setItem("locales", lang);
        window.location.reload();
    }
    return (
        <div className="dropdown" style={{ position: 'fixed', top: '93%', bottom: '3%', right: '0', zIndex: '100' }}>
            <button
                className="btn btn-outline-dark dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
                style={{ backgroundColor: '#fff' }}
            >
                Language
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li style={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ width: '30px', height: '30px', marginLeft: '5px' }} src="https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fpng-transparent-ensign-flag-nation-vietnam-flags-icon.png?alt=media&token=674d618e-1add-4b88-8c73-435af8380d7b" alt="" />

                    <span onClick={() => {
                        changeLanguage('vi')
                    }} className="dropdown-item">
                        Vietnamese</span>

                </li>
                <li style={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ width: '30px', height: '30px', marginLeft: '5px' }} src="https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fpng-transparent-flag-of-england-flag-of-the-united-kingdom-flag-of-great-britain-nostalgic-british-flag-flag-rectangle-world.png?alt=media&token=510f7d0a-2e9d-464d-8126-ec8ea7581e01" alt="" />
                    <span onClick={() => {
                        changeLanguage('en')
                    }} className="dropdown-item">English</span></li>
            </ul>
        </div>
    )
}