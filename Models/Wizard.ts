import { FC } from "react"

export type FormSteps = "SwapForm" | "Email" | "Code" | "OffRampExchangeOAuth" | "ExchangeOAuth" | "ExchangeApiCredentials" | "SwapConfirmation"

export type SwapSteps = "Email" | "Code" | "Overview" | "Withdrawal" | "OffRampWithdrawal" | "Processing" | "Success" | "Failed" | "ExternalPayment"
export type LoginSteps = "Email" | "Code"

export type BaseWizard = {
    [key: string]: SwapCreateStep
}

export type FormWizardSteps = {
    [Property in FormSteps]: SwapCreateStep
}
export type SwapWizardSteps = {
    [Property in SwapSteps]: SwapCreateStep
}
export type LoginWizardSteps = {
    [Property in LoginSteps]: SwapCreateStep
}

export enum SwapCreateStep {
    MainForm = "MainForm",
    Email = "Email",
    Code = "Code",
    PendingSwaps = "PendingSwaps",
    AuthorizeCoinbaseWithdrawal = "AuthorizeCoinbaseWithdrawal",
    OffRampOAuth = "OffRampOAuth",
    ApiKey = "ApiKey",
    Confirm = "Confirm",
    TwoFactor = "TwoFactor",
    ActiveSwapLimit = 'ActiveSwapLimit',
    Error = "Error"
}

export enum SwapWithdrawalStep {
    Withdrawal = "Withdrawal",
    CoinbaseManualWithdrawal = "CoinbaseManualWithdrawal",
    DepositPending = "DepositPending",
    TransferConfirmation = 'TransferConfirmation',
    OutputTransferProccessing = 'OutputTransferProccessing',
    ProcessingWalletTransaction = "ProcessingWalletTransaction",
    Success = "Success",
    Failed = "Failed",
    Error = "Error",
    Delay = "Delay",
    OffRampWithdrawal = "OffRampWithdrawal",
    WithdrawFromImtblx = "WithdrawFromImtblx",
    SelectWithdrawalType = "SelectWithdrawalType",
    CoinbaseInternalWithdrawal = "CoinbaseInternalWithdrawal",
}

export enum AuthStep {
    Email = "Email",
    Code = "Code",
    PendingSwaps = 'PendingSwaps'
}

export type Steps = AuthStep | SwapWithdrawalStep | SwapCreateStep

export const ExchangeAuthorizationSteps: { [key: string]: SwapCreateStep } = {
    "api_credentials": SwapCreateStep.ApiKey,
    "o_auth2": SwapCreateStep.AuthorizeCoinbaseWithdrawal
}

export const OfframpExchangeAuthorizationSteps: { [key: string]: SwapCreateStep } = {
    "api_credentials": SwapCreateStep.ApiKey,
    "o_auth2": SwapCreateStep.OffRampOAuth
}

export class WizardStep<T> {
    Name: T;
    Content: FC;
    onBack?: () => void;
    onNext?: (data?: any) => Promise<void>;
    positionPercent: number;
}