"use client"

import React, { useEffect, useState } from "react"
import useWebRTCAudioSession from "@/hooks/use-webrtc"
import { tools } from "@/lib/tools"
import { VoiceSelector } from "@/components/voice-select"
import { BroadcastButton } from "@/components/broadcast-button"
import { StatusDisplay } from "@/components/status"
import { MessageControls } from "@/components/message-controls"
import { motion } from "framer-motion"
import { useToolsFunctions } from "@/hooks/use-tools"
import { Separator } from "@/components/ui/separator"
import AudioWaveform from "@/components/audio-waveform"
import { useRealtimeDiagnosis } from "@/hooks/use-realtime-diagnosis"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"

const App: React.FC = () => {
  // State for voice selection
  const [voice, setVoice] = useState("sage")

  // WebRTC Audio Session Hook
  const {
    status,
    isSessionActive,
    registerFunction,
    handleStartStopClick,
    msgs,
    conversation,
    isAISpeaking,
  } = useWebRTCAudioSession(voice, tools);

  const { diagnosisText, isLoading } = useRealtimeDiagnosis(conversation)

  // Get all tools functions
  const toolsFunctions = useToolsFunctions();

  useEffect(() => {
    // Register all functions by iterating over the object
    Object.entries(toolsFunctions).forEach(([name, func]) => {
      const functionNames: Record<string, string> = {
        timeFunction: 'getCurrentTime',
        backgroundFunction: 'changeBackgroundColor',
        partyFunction: 'partyMode',
        launchWebsite: 'launchWebsite', 
        copyToClipboard: 'copyToClipboard',
        scrapeWebsite: 'scrapeWebsite'
      };
      
      registerFunction(functionNames[name], func);
    });
  }, [registerFunction, toolsFunctions])

  return (
    <main className="h-full w-screen grid grid-cols-1 md:grid-cols-2 px-4 md:px-10 lg:px-16 py-3 md:py-8 lg:py-12">
      <motion.div 
        className="container flex flex-col items-center justify-center mx-auto max-w-3xl p-7 border rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AudioWaveform isPlaying={isAISpeaking}/> 
        
        <motion.div 
          className="w-full bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <VoiceSelector value={voice} onValueChange={setVoice} />
          
          <div className="flex flex-col items-center gap-4">
            <BroadcastButton 
              isSessionActive={isSessionActive} 
              onClick={handleStartStopClick}
            />
          </div>
          
        </motion.div>
        
        {status && <StatusDisplay status={status} />}
        {/* <div className="w-full flex flex-col items-center gap-4">
          <ToolsEducation />
        </div> */}
      </motion.div>

      <motion.div>
        <div className="border rounded-md min-h-[200px] mx-auto max-w-xl">
            <div className="px-3 bg-muted rounded-t-md py-2">
                <h3 className="font-semibold">Real Time Diagnosis</h3>
            </div>
            <Separator />

            <div className="py-4 px-3">
                {
                    isLoading ? 
                    <>
                        <Skeleton className="h-5 mb-2.5 w-4/5" />
                        <Skeleton className="h-5 mb-2.5 w-5/6" />
                        <Skeleton className="h-5 mb-2.5 w-4/5" />
                        <Skeleton className="h-5 mb-2.5 w-5/6" />
                    </>
                    : 
                    <ScrollArea className="h-[220px]">
                        <p>{diagnosisText}</p>
                    </ScrollArea>
                }
            </div>
        </div>
        {status && (
            <motion.div 
              className="max-w-xl mx-auto flex flex-col gap-2 mt-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MessageControls conversation={conversation} msgs={msgs} />
            </motion.div>
          )}
      </motion.div>
    </main>
  )
}

export default App;