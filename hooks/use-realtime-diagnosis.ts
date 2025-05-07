import { Conversation } from '@/lib/conversations';
import { diagnosisPrompt } from '@/lib/prompts';
import {GoogleGenAI} from '@google/genai';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export const useRealtimeDiagnosis = (conversation: Array<Conversation>) => {
    const input = conversation.map(conversation => {
        return `${conversation.role === "assistant" ? "therapist" : "patient"}: 
        ${conversation.text}`
    }).join("\n")

    const queryClient = useQueryClient();
    
    const { data: diagnosisText, isLoading, isError, error } = useQuery({
        queryKey: ['realtimeDiagnosis'],
        queryFn: async () => {
            // Assuming ai.models.generateContent is the function to be called,
            // and it returns an object with a .text property, as per the original selected code.
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash-001',
                contents: diagnosisPrompt(input),
                
            });
            return response.text;
        },
        enabled: conversation.length >= 5,
        initialData: `You do not have a diagnosis yet, because the conversation is still beginning.
        As you continue to converse you will automatically receive your diagnosis in real-time.`,
    });

    useEffect(() => {
        if (conversation.length >= 5 && conversation.length % 4 === 0) {
            queryClient.invalidateQueries({ queryKey: ['realtimeDiagnosis'] });
        }
    }, [conversation.length, queryClient]);


    // The original console.log(response.text) is now console.log(diagnosisText).
    // diagnosisText will be the initialData ("") initially, and then the fetched text.
    return {
        diagnosisText,
        isLoading,
        error,
        isError
    }


}