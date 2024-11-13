import { message } from "antd";


window.toastify=(msg="",type)=>{
    switch (type) {
        case "success": message.success(msg);break;
        case "warning": message.warning(msg);break;
        case "error": message.error(msg);break;
        case "info": message.info(msg);break;
        
       
        
        default:
            message.info(msg);break;
            
    }

}

window.randomId = () => {
    return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  };