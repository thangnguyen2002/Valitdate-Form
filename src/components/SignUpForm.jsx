import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"
import "./signup.css"
// npm i formik va npm i yup (ho tro cho viec validate initialValues vs formik khi nhap vao)
const SignUpForm = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            phone: "",
            password: "",
            confirmedPassword: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required").min(4,"Must be 4 characters or more"), //la 1 string va ko dc de trong, neu de trong se hien "Required"
            email: Yup.string().required("Required").matches(
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email address"
                ), //matches return true if it match, false if it doesn't match; second param is to do things if matches return 
            password: Yup.string().required("Required").matches(
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                "Password must be 7-19 characters and contain at least one letter, one number and a special character"
              ),
            confirmedPassword: Yup.string().required("Required").oneOf([Yup.ref("password"), null], "Password must match"), //ref: based on "password" above, if it doesn't match; second param is to do things if matches return 
            phone: Yup.string().required("Required").matches(
                /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, //pattern này đảm bảo từ 9-10 chữ số, chứ ko phải chữ cái
                "Must be a valid phone number"
              ),
        }),
        onSubmit: (values) => {
            window.alert("Form submitted") //or alert() is okay
            console.log(values);
        }
    })
    // console.log(formik.values);
    // console.log(formik.errors); //in ra loi
    // console.log(formik.errors.name); //co the lay tung loi ra
    // console.log(formik.errors.email); //in ra loi
    console.log(formik.errors.password); //in ra loi
    
    return ( 
        <>
            <section>
                <form className="infoform" onSubmit={formik.handleSubmit}> 
                {/* neu formik.errors ton tai => event handleSubmit se ko dc thuc thi, ko submit form (tuc la se ko console.log(values); */}
                {/* luu y, id va name cua input phai giong vs initialValues. */}
                    <label>Your name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name" value={formik.values.name} onChange={formik.handleChange}/>
                    {formik.errors.name && ( //hien ra ngoai form (neu name error -> hien erro ra)
                        <p className="errorMsg">{formik.errors.name}</p>
                    )}
                    <label>Email address</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" value={formik.values.email} onChange={formik.handleChange}/>
                    {formik.errors.email && ( //hien ra ngoai form (neu name error -> hien erro ra)
                        <p className="errorMsg">{formik.errors.email}</p>
                    )}
                    <label>Password</label>
                    <input type="text" id="password" name="password" placeholder="Enter your password" value={formik.values.password} onChange={formik.handleChange}/>
                    {formik.errors.password && ( //hien ra ngoai form (neu name error -> hien erro ra)
                        <p className="errorMsg">{formik.errors.password}</p>
                    )}
                    <label>Confirm Password</label>
                    <input type="text" id="confirmedPassword" name="confirmedPassword" placeholder="Confirm your password" value={formik.values.confirmedPassword} onChange={formik.handleChange}/>
                    {formik.errors.confirmedPassword && ( //hien ra ngoai form (neu name error -> hien erro ra)
                        <p className="errorMsg">{formik.errors.confirmedPassword}</p>
                    )}
                    <label>Phone number</label>
                    <input type="text" id="phone" name="phone" placeholder="Enter your phone numbers" value={formik.values.phone} onChange={formik.handleChange}/>
                    {formik.errors.phone && ( //hien ra ngoai form (neu name error -> hien erro ra)
                        <p className="errorMsg">{formik.errors.phone}</p>
                    )}
                    <button type="submit">Continue</button>
                </form>
            </section>
        </>
     );
}
 
export default SignUpForm;