import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import { useFormWizardaUpdate, useFormWizardState } from "../../context/formWizardProvider";
import { SwapWithdrawalStep } from "../../Models/Wizard";
import ErrorStep from "./Steps/ErrorStep";
import ExchangeDelay from "./Steps/ExchangeDelayStep";
import FailedStep from "./Steps/FailedStep";
import DepositPendingStep from "./Steps/ProccessingSteps/DepositPendingStep";
import SuccessfulStep from "./Steps/SuccessfulStep";
import WithdrawFromImtblxStep from "./Steps/Wallet/WithdrawFromImtblxStep";
import CoinbaseInternalWithdrawalStep from "./Steps/Wallet/CoinbaseInternalWithdrawalStep";
import WithdrawExchangeStep from "./Steps/WithdrawExhangeStep";
import WithdrawNetworkStep from "./Steps/WithdrawNetworkStep";
import Wizard from "./Wizard";
import WizardItem from "./WizardItem";
import { TimerProvider } from "../../context/timerContext";
import ProccessingWalletTransactionStep from "./Steps/ProccessingSteps/ProccessingWalletTransactionStep";
import TransferConfirmationStep from "./Steps/ProccessingSteps/TransferConfirmation";
import OutputTransferProccessingStep from "./Steps/ProccessingSteps/OutputTransferProcessingStep";

const SwapWithdrawalWizard: FC = () => {
    const router = useRouter();
    const handleGoBack = useCallback(() => {
        router.back()
    }, [router])
    const { goToStep } = useFormWizardaUpdate()
    const { error } = useFormWizardState()

    const GoBackFromError = useCallback(() => goToStep(error?.Step, "back"), [error])
    const GoBackToSelectWithdrawalTypeStep = useCallback(() => goToStep(SwapWithdrawalStep.SelectWithdrawalType, "back"), [])

    return (
        <TimerProvider>
            <Wizard>
                <WizardItem StepName={SwapWithdrawalStep.Withdrawal} PositionPercent={90} GoBack={handleGoBack}>
                    <WithdrawExchangeStep />
                </WizardItem>
                <WizardItem StepName={SwapWithdrawalStep.CoinbaseManualWithdrawal} PositionPercent={90} GoBack={GoBackToSelectWithdrawalTypeStep}>
                    <WithdrawExchangeStep />
                </WizardItem>
                <WizardItem StepName={SwapWithdrawalStep.OffRampWithdrawal} PositionPercent={90} GoBack={handleGoBack}>
                    <WithdrawNetworkStep />
                </WizardItem>
                <WizardItem StepName={SwapWithdrawalStep.WithdrawFromImtblx} GoBack={handleGoBack} PositionPercent={90} >
                    <WithdrawFromImtblxStep />
                </WizardItem>
                <WizardItem StepName={SwapWithdrawalStep.CoinbaseInternalWithdrawal} GoBack={GoBackToSelectWithdrawalTypeStep} PositionPercent={90} >
                    <CoinbaseInternalWithdrawalStep />
                </WizardItem>
                <WizardItem StepName={SwapWithdrawalStep.DepositPending} PositionPercent={95} GoBack={handleGoBack}>
                    <DepositPendingStep />
                </WizardItem>
                <WizardItem StepName={SwapWithdrawalStep.TransferConfirmation} PositionPercent={95} GoBack={handleGoBack}>
                    <TransferConfirmationStep />
                </WizardItem>
                <WizardItem StepName={SwapWithdrawalStep.OutputTransferProccessing} PositionPercent={95} GoBack={handleGoBack}>
                    <OutputTransferProccessingStep />
                </WizardItem>
                <WizardItem StepName={SwapWithdrawalStep.ProcessingWalletTransaction} PositionPercent={95} GoBack={handleGoBack}>
                    <ProccessingWalletTransactionStep />
                </WizardItem>
                <WizardItem StepName={SwapWithdrawalStep.Delay} PositionPercent={95} GoBack={handleGoBack}>
                    <ExchangeDelay />
                </WizardItem>
                <WizardItem StepName={SwapWithdrawalStep.Success} PositionPercent={100} GoBack={handleGoBack}>
                    <SuccessfulStep />
                </WizardItem>
                <WizardItem StepName={SwapWithdrawalStep.Error} PositionPercent={100} GoBack={GoBackFromError}>
                    <ErrorStep />
                </WizardItem>
                <WizardItem StepName={SwapWithdrawalStep.Failed} PositionPercent={100} GoBack={handleGoBack}>
                    <FailedStep />
                </WizardItem>
            </Wizard>
        </TimerProvider>
    )
};

export default SwapWithdrawalWizard;