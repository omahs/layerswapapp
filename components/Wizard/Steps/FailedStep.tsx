import { FC, useCallback, useEffect } from 'react'
import { useSwapDataState } from '../../../context/swap';
import { useIntercom } from 'react-use-intercom';
import SubmitButton, { DoubleLineText } from '../../buttons/submitButton';
import { useAuthState } from '../../../context/authContext';
import MessageComponent from '../../MessageComponent';
import { SwapStatus } from '../../../Models/SwapStatus';
import GoHomeButton from '../../utils/GoHome';
import { SwapItem } from '../../../lib/layerSwapApiClient';
import { ChatIcon, HomeIcon } from '@heroicons/react/solid';
import { TrackEvent } from '../../../pages/_document';

const FailedStep: FC = () => {
    const { swap } = useSwapDataState()
    const { email, userId } = useAuthState()
    const { boot, show, update } = useIntercom()
    const updateWithProps = () => update({ email: email, userId: userId, customAttributes: { swapId: swap?.id } })

    useEffect(() => {
        plausible(TrackEvent.SwapFailed)
    }, [])

    const startIntercom = useCallback(() => {
        boot();
        show();
        updateWithProps()
    }, [boot, show, updateWithProps])

    return (
        <>
            {
                swap?.status == SwapStatus.Failed &&
                <Failed onGetHelp={startIntercom} swap={swap} />
            }
            {
                swap?.status == SwapStatus.Cancelled &&
                <Canceled onGetHelp={startIntercom} swap={swap} />
            }
            {
                swap?.status == SwapStatus.Expired &&
                <Expired onGetHelp={startIntercom} swap={swap} />
            }
        </>
    )
}
type Props = {
    swap: SwapItem
    onGetHelp: () => void
}

const Expired = ({ swap, onGetHelp }: Props) => {
    return <MessageComponent>
        <MessageComponent.Content icon='red'>
            <MessageComponent.Header>
                Swap expired
            </MessageComponent.Header>
            <MessageComponent.Description>
                {
                    swap?.message ?
                        swap.message
                        :
                        <>
                            <p>
                                The transfer wasn’t completed during the allocated timeframe.
                            </p>
                            <p>
                                If you’ve already sent crypto for this swap, your funds are safe, please contact our support.
                            </p>
                        </>
                }
            </MessageComponent.Description>

        </MessageComponent.Content>
        <MessageComponent.Buttons>
            <div className="flex flex-row text-white text-base space-x-2">
                <div className='basis-1/3'>
                    <SubmitButton text_align='left' onClick={onGetHelp} isDisabled={false} isSubmitting={false} buttonStyle='outline' icon={<ChatIcon className="h-5 w-5" aria-hidden="true" />}>
                        <DoubleLineText
                            colorStyle='mltln-text-dark'
                            primaryText='Support'
                            secondarytext='Contact'
                        />
                    </SubmitButton>
                </div>
                <div className='basis-2/3'>
                    <GoHomeButton>
                        <SubmitButton button_align='right' text_align='left' isDisabled={false} isSubmitting={false} buttonStyle='outline' icon={<HomeIcon className="h-5 w-5" aria-hidden="true" />}>
                            <DoubleLineText
                                colorStyle='mltln-text-dark'
                                primaryText='Swap'
                                secondarytext='Do another'
                            />
                        </SubmitButton>
                    </GoHomeButton>
                </div>
            </div>
        </MessageComponent.Buttons>
    </MessageComponent>
}

const Canceled = ({ swap, onGetHelp }: Props) => {
    return <MessageComponent>
        <MessageComponent.Content icon='red'>
            <MessageComponent.Header>
                Swap canceled
            </MessageComponent.Header>
            <MessageComponent.Description>
                {
                    swap?.message ?
                        swap.message
                        :
                        <p>
                            You've either canceled this swap manually, or you've created a swap without completing this one.
                        </p>
                }
            </MessageComponent.Description>
        </MessageComponent.Content>
        <MessageComponent.Buttons>
            <div className="flex flex-row text-white text-base space-x-2">
                <div className='basis-1/3'>
                    <SubmitButton text_align='left' onClick={onGetHelp} isDisabled={false} isSubmitting={false} buttonStyle='outline' icon={<ChatIcon className="h-5 w-5" aria-hidden="true" />}>
                        <DoubleLineText
                            colorStyle='mltln-text-dark'
                            primaryText='Support'
                            secondarytext='Contact'
                        />
                    </SubmitButton>
                </div>
                <div className='basis-2/3'>
                    <GoHomeButton>
                        <SubmitButton button_align='right' text_align='left' isDisabled={false} isSubmitting={false} buttonStyle='outline' icon={<HomeIcon className="h-5 w-5" aria-hidden="true" />}>
                            <DoubleLineText
                                colorStyle='mltln-text-dark'
                                primaryText='Swap'
                                secondarytext='Do another'
                            />
                        </SubmitButton>
                    </GoHomeButton>
                </div>
            </div>
        </MessageComponent.Buttons>
    </MessageComponent>
}
const Failed = ({ swap, onGetHelp }: Props) => {
    return <MessageComponent>
        <MessageComponent.Content icon='red'>
            <MessageComponent.Header>
                Swap failed
            </MessageComponent.Header>
            <MessageComponent.Description>
                {
                    swap?.message ?
                        swap.message
                        :
                        <>
                            <p>
                                Your funds are safe, but there seems to be an issue with the swap.
                            </p>
                            <p>  Please contact our support team and we’ll help you fix this.</p>
                        </>
                }
            </MessageComponent.Description>
        </MessageComponent.Content>
        <MessageComponent.Buttons>
            <MessageComponent.Buttons>
                <div className="flex flex-row text-white text-base space-x-2">
                    <div className='basis-1/3'>
                        <SubmitButton text_align='left' onClick={onGetHelp} isDisabled={false} isSubmitting={false} buttonStyle='outline' icon={<ChatIcon className="h-5 w-5" aria-hidden="true" />}>
                            <DoubleLineText
                                colorStyle='mltln-text-dark'
                                primaryText='Support'
                                secondarytext='Contact'
                            />
                        </SubmitButton>
                    </div>
                    <div className='basis-2/3'>
                        <GoHomeButton>
                            <SubmitButton button_align='right' text_align='left' isDisabled={false} isSubmitting={false} buttonStyle='outline' icon={<HomeIcon className="h-5 w-5" aria-hidden="true" />}>
                                <DoubleLineText
                                    colorStyle='mltln-text-dark'
                                    primaryText='Swap'
                                    secondarytext='Do another'
                                />
                            </SubmitButton>
                        </GoHomeButton>
                    </div>
                </div>
            </MessageComponent.Buttons>
        </MessageComponent.Buttons>
    </MessageComponent>
}


export default FailedStep;