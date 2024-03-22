export interface IProgressionStepProps {
    steps: ISteps[]
}

export interface ISteps {
    label: string
    status: 'ongoing' | 'pending' | 'completed'
    // content?: () => {} uncomment if you want to use
}
