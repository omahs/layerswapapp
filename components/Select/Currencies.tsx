import { Field, useFormikContext } from "formik";
import { FC, useCallback, useEffect } from "react";
import { useSettingsState } from "../../context/settings";
import KnownInternalNames from "../../lib/knownIds";
import { SwapType } from "../../lib/layerSwapApiClient";
import { SortingByOrder } from "../../lib/sorting";
import { Currency } from "../../Models/Currency";
import { SwapFormValues } from "../DTOs/SwapFormValues";
import Select from "./Select";
import { SelectMenuItem } from "./selectMenuItem";

const CurrenciesField: FC = () => {
    const {
        values: { to, currency, from, swapType },
        setFieldValue,
    } = useFormikContext<SwapFormValues>();

    const name = "currency"
    const { discovery: { resource_storage_url }, currencies, exchanges } = useSettingsState();

    const currencyIsAvilable = useCallback((c: Currency) => from && to && from?.baseObject.currencies.some(fc => fc.asset === c.asset && fc.status === "active" && fc.is_deposit_enabled) && to.baseObject.currencies.some(tc => tc.asset === c.asset && tc.status === "active" && tc.is_withdrawal_enabled), [from, to, swapType])

    const mapCurranceToMenuItem = (c: Currency): SelectMenuItem<Currency> => ({
        baseObject: c,
        id: c.asset,
        name: c.asset,
        order: c.asset === KnownInternalNames.Currencies.LRC && (from?.baseObject?.internal_name === KnownInternalNames.Networks.LoopringMainnet || to?.baseObject?.internal_name === KnownInternalNames.Networks.LoopringMainnet) ? 0 : 1,
        imgSrc: `${resource_storage_url}/layerswap/currencies/${c.asset.toLowerCase()}.png`,
        isAvailable: true,
        isDefault: false,
    })

    const currencyMenuItems: SelectMenuItem<Currency>[] = (from && to) ? currencies
        .filter(currencyIsAvilable)
        .map(mapCurranceToMenuItem).sort(SortingByOrder)
        : []

    useEffect(() => {
        if (!from || !to) {
            setFieldValue(name, null)
            return;
        }
        if (currency && currencyIsAvilable(currency.baseObject)) return

        const default_currency = currencies.filter(currencyIsAvilable)?.map(mapCurranceToMenuItem)?.sort(SortingByOrder)?.[0]

        if (default_currency) {
            setFieldValue(name, default_currency)
        }
        else if (currency) {
            setFieldValue(name, null)
        }

    }, [from, to, currencies, exchanges, currency])

    return (<>
        <Field disabled={!currencyMenuItems?.length} name={name} values={currencyMenuItems} value={currency} as={Select} setFieldValue={setFieldValue} smallDropdown={true} />
    </>)
};
export default CurrenciesField