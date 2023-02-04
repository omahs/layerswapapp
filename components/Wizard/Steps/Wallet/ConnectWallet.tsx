import { CheckIcon, LinkIcon, SwitchHorizontalIcon } from '@heroicons/react/solid';
import { FC, useCallback, useEffect, useState } from 'react'
import { useFormWizardaUpdate } from '../../../../context/formWizardProvider';
import { SwapWithdrawalStep } from '../../../../Models/Wizard';
import SubmitButton from '../../../buttons/submitButton';
import { useSwapDataState, useSwapDataUpdate } from '../../../../context/swap';
import { useSettingsState } from '../../../../context/settings';
import { classNames } from '../../../utils/classNames';
import { useInterval } from '../../../../hooks/useInterval';
import { GetSwapStatusStep } from '../../../utils/SwapStatus';
import shortenAddress from "../../../utils/ShortenAddress"
import { SwapStatus } from '../../../../Models/SwapStatus';

const ConnectWallet: FC = () => {
    const [loading, setLoading] = useState(false)
    const [verified, setVerified] = useState<boolean>()
    const [txidApplied, setTxidApplied] = useState(false)
    const [applyCount, setApplyCount] = useState(0)
    const [transactionId, setTransactionId] = useState<string>()
    const [transferDone, setTransferDone] = useState<boolean>()
    const { walletAddress, swap } = useSwapDataState()
    const { setInterval } = useSwapDataUpdate()
    const { networks } = useSettingsState()

    const { source_network: source_network_internal_name } = swap
    const source_network = networks.find(n => n.internal_name === source_network_internal_name)

    const steps = [
        { name: walletAddress ? `Connected to ${shortenAddress(walletAddress)}` : 'Connect wallet', description: 'Connect your ImmutableX wallet', href: '#', status: walletAddress ? 'complete' : 'current' },
        { name: 'Transfer', description: "Initiate a transfer from your wallet to our address", href: '#', status: verified ? 'current' : 'upcoming' },
    ]

    const applyNetworkInput = useCallback(async () => {
        try {
           
        }
        catch (e) {
            //TODO handle
        }
    }, [transactionId])

    useInterval(
        applyNetworkInput,
        transactionId && !txidApplied && applyCount < 10 ? 8000 : null,
    )

    useEffect(() => {
        return () => setInterval(0)
    }, [])

    const swapStatusStep = GetSwapStatusStep(swap)

    const handleConnect = useCallback(async () => {
        
    }, [source_network])

    const handleTransfer = useCallback(async () => {
       
    }, [walletAddress, swap, source_network])

    return (
        <>
            <div className="w-full space-y-5 flex flex-col justify-between h-full text-primary-text">
                <div className='space-y-4'>
                    <div className="flex items-center">
                        <h3 className="block text-lg font-medium text-white leading-6 text-left">
                            Complete the transfer
                        </h3>
                    </div>
                    <p className='leading-5'>
                        We’ll help you to send crypto from your ImmutableX wallet
                    </p>
                </div>
                <WalletSteps steps={steps} />
                {
                    !walletAddress &&
                    <SubmitButton isDisabled={loading} isSubmitting={loading} onClick={handleConnect} icon={<LinkIcon className="h-5 w-5 ml-2" aria-hidden="true" />} >
                        Connect
                    </SubmitButton>
                }
                {
                    walletAddress &&
                    <SubmitButton isDisabled={loading || transferDone} isSubmitting={loading || transferDone} onClick={handleTransfer} icon={<SwitchHorizontalIcon className="h-5 w-5 ml-2" aria-hidden="true" />} >
                        Transfer
                    </SubmitButton>
                }

            </div>
        </>
    )
}

function WalletSteps({ steps }) {
    return (
        <nav aria-label="Progress">
            <ol role="list" className="overflow-hidden">
                {steps.map((step, stepIdx) => (
                    <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative')}>
                        {step.status === 'complete' ? (
                            <>
                                {stepIdx !== steps.length - 1 ? (
                                    <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-primary" aria-hidden="true" />
                                ) : null}
                                <div className="group relative flex items-start">
                                    <span className="flex h-9 items-center">
                                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full  bg-primary">
                                            <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                        </span>
                                    </span>
                                    <span className="ml-4 flex min-w-0 flex-col">
                                        <span className="text-sm font-medium text-gray-300">{step.name}</span>
                                        {/* <span className="text-sm text-primary-text">{step.description}</span> */}
                                    </span>
                                </div>
                            </>
                        ) : step.status === 'current' ? (
                            <>
                                {stepIdx !== steps.length - 1 ? (
                                    <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                                ) : null}
                                <div className="group relative flex items-start" aria-current="step">
                                    <span className="flex h-9 items-center" aria-hidden="true">
                                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white">
                                            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                                        </span>
                                    </span>
                                    <span className="ml-4 flex min-w-0 flex-col">
                                        <span className="text-sm font-medium text-primary">{step.name}</span>
                                        <span className="text-sm text-primary-text">{step.description}</span>
                                    </span>
                                </div>
                            </>
                        ) : (
                            <>
                                {stepIdx !== steps.length - 1 ? (
                                    <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                                ) : null}
                                <div className="group relative flex items-start">
                                    <span className="flex h-9 items-center" aria-hidden="true">
                                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                                            <span className="h-2.5 w-2.5 rounded-full bg-transparent " />
                                        </span>
                                    </span>
                                    <span className="ml-4 flex min-w-0 flex-col">
                                        <span className="text-sm font-medium text-primary-text">{step.name}</span>
                                        <span className="text-sm text-primary-text">{step.description}</span>
                                    </span>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default ConnectWallet;