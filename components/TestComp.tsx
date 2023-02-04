import { useSettingsState } from "../context/settings"

export default () => {

    const settings = useSettingsState() 
    return <>identity_url: {settings?.discovery?.identity_url}</>
}