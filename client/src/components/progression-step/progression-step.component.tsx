import React from 'react'
import { IProgressionStepProps } from './progression-step.interface'
import './progression-step.style.css'

const ProgressionStep: React.FC<IProgressionStepProps> = ({ steps }) => {
    const formatStepNumber = (stepNumber: number) => {
        return stepNumber < 10 ? `0${stepNumber}` : `${stepNumber}`
    }

    return (
        <>
            <div className="flex justify-between z-0">
                {steps?.map((step, i) => (
                    <div key={i} className={`step-item ${step?.status}`}>
                        <div className="step">
                            {step?.status === 'completed' ? (
                                <i className="ri-check-line text-white"></i>
                            ) : (
                                formatStepNumber(i + 1)
                            )}
                        </div>
                        <p className="text-logistical-gray-ver4">
                            {step.label}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ProgressionStep
