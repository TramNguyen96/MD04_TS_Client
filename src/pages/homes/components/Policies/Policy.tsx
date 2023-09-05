import './Policy.scss'

export default function Policy() {
    const policies = [
        {
            img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/policy%2Fdelivery-truck.svg?alt=media&token=e889ea54-4313-41e5-9385-36485875e254",
            content: "Delivered in 3 Weeks",
        },
        {
            img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/policy%2Freturning.svg?alt=media&token=c9efcc52-81e6-4ebe-b2e0-ae5a56452eb7",
            content: "Hassle-Free Returns ",
        },
        {
            img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/policy%2Fcheck.svg?alt=media&token=b4d4409f-435e-4ebd-9efc-30aa5d1f67a5",
            content: "Safe & Secure Payment ",
        },
        {
            img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/policy%2Fnatural-ingredients.svg?alt=media&token=13d920cc-15f4-4498-bb0c-77b4b2b6ce06",
            content: "Eco Friendly",
        }

    ]
    return (
        <div className='policy' style={{ marginTop: "2em" }} >

            <div className='policy_main'>
                {
                    policies.map((item) => (
                        <div className='policy_content'>
                            <div className='policy_content_item'>
                                <img src={item.img} alt="" />
                            </div>
                            <div className='policy_content_text'>
                                <span> {item.content} </span>
                            </div>

                        </div>
                    ))
                }
            </div>


        </div>

    )
}
