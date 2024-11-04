"use client"
import { useEffect, useState } from "react";
import "./inputStyle.css"
import { FaRegEye,FaRegEyeSlash  } from "react-icons/fa";


type InputFieldProps = {
    inputType: string;
    inputTitle: string;
    style?: React.CSSProperties;
    className?: string;
    width?:number;
    height?:number;
    color?:string;
    bgColor?:string;
    value: string | number |undefined;
    onChange: (value: string | number) => void;
    errorMsg?:boolean;
    setErrorMsg?:string;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const InputField = ({
    inputType,
    inputTitle,
    style = {},
    className,
    width = 350,
    height = 60,
    color = "#000",
    bgColor = "#fff",
    value,
    onChange,
    errorMsg = false,
    setErrorMsg = "",
    onKeyPress
}: InputFieldProps) => {

    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setError(setErrorMsg)
    }, [setErrorMsg ]);
    
    const validateInput = (value: string) => {
        if(!errorMsg ) return setErrorMsg;

        if (!value) return 'Form cannot be empty';

        if (inputType === "password" || inputType === "Password") {
            if (value.length < 8 || !/\d/.test(value)) {
                return 'Password must be 8+ characters with a number';
            }
        }
        if (inputType === 'email' || inputType === "Email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return 'Invalid email format';
            }
        }
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const errorMessage = validateInput(value);
        setError(errorMessage);
        onChange(value);
    };

    const  styles: { [key: string]: React.CSSProperties }= {
        leftRadius: {
            borderTopLeftRadius: '6px',
            borderBottomLeftRadius: '6px',
            borderRight: "none",
        },
        defaultStyle : {
            width: `${width}px`,
            height: `${height}px`,
            border: '2px solid rgb(107,114,128)',
            borderRadius: '6px',
            color: color.toString(),
            backgroundColor: bgColor.toString(),
            ...style
        },
        eyeStyle :{
            cursor: 'pointer',
            width: '16.666667%',
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        noSelect : {
            userSelect: 'none',
            WebkitUserSelect: 'none', 
            MozUserSelect: 'none', 
            msUserSelect: 'none' 
        }
    };

    if(inputType === "password" || inputType === "Password"){
        return(
            <div >
                <div style={styles.defaultStyle} className={`input-field ${className}`} >
                    <input 
                        type={hidePassword?"password" : "text"}
                        placeholder="-" 
                        style={styles.leftRadius} 
                        value={value}
                        onChange={handleChange}/>
                    <span onClick={()=>setHidePassword(!hidePassword)} style={styles.eyeStyle} >
                        {hidePassword?
                            <FaRegEye style={{width:"50%",height:"50%"}}/>
                            :
                            <FaRegEyeSlash  style={{width:"50%",height:"50%"}} />
                        }
                    </span>
                    <label style={styles.noSelect}>{inputTitle}</label>
                </div>
                {error ? 
                <p style={{color:"red", fontSize:"12px"}}>{error}</p>
                : <p style={{color:"transparent", fontSize:"12px"}}>-</p>
                }
            </div>
        )
    }else if(inputType==='number' || inputType ==="Number"){
        return ( 
            <div>
                <div className="input-field" style={styles.defaultStyle}>
                    <input 
                    type="number"
                    placeholder="-" 
                    value={value}
                    onChange={handleChange} />
                    <label>{inputTitle}</label>
                </div>
                {error ? 
                <p style={{color:"red", fontSize:"12px"}}>{error}</p>
                : <p style={{color:"transparent", fontSize:"12px"}}>-</p>
                }
            </div>
        );
    }else{
        return ( 
            <div>
                <div className="input-field" style={styles.defaultStyle}>
                    <input 
                    type={
                        inputType === 'email' || inputType === 'Email' 
                        ? 'email' 
                        : 'text'
                    }
                    onKeyPress={onKeyPress}
                    placeholder="-" 
                    value={value}
                    onChange={handleChange} />
                    <label>{inputTitle}</label>
                </div>
                {error ? 
                <p style={{color:"red", fontSize:"12px"}}>{error}</p>
                : <p style={{color:"transparent", fontSize:"12px"}}>-</p>
                }
            </div>
        );
    }
}

export default InputField;