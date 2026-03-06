import {
    Button,
    Card,
    CheckBox,
    Donate,
    Filter,
    Footer,
    Form,
    Header,
    Login,
    Logo,
    Notification, Product,
    Profile, SignUp, Upload
} from "../Components";

const layout = () => {
    return (
        <div className="home">
            <p>Product</p>
            <Product/>
            <p>Upload</p>
            <Upload />
            <p>SignUp</p>
            <SignUp/>
            <p>Header</p>
            <Header/>
            <Logo/>
            <p>button</p>
            <Button/>
            <p>Card</p>
            <Card/>
            <p>Checkbox</p>
            <CheckBox/>
            <p>Filter</p>
            <Filter/>
            <p>Donate</p>
            <Donate/>
            <p>Form</p>
            <Form/>
            <p>Notification</p>
            <Notification/>
            <p>Profile</p>
            <Profile/>
            <p>Login</p>
            <Login/>

            <p>Footer</p>
            <Footer/>
        </div>
    );
};
export default layout;
