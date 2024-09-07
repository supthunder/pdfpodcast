'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs"
import { FileIcon, LinkIcon, TextIcon } from 'lucide-react'

// Mock function to simulate audio generation
const generateAudioUrl = async () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"); // Mock URL
    }, 1000); // Simulating API delay
  });
};

export default function ContentInput() {
  const [selectedTab, setSelectedTab] = useState("pdf");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [articleLink, setArticleLink] = useState("");
  const [textInput, setTextInput] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null); // State to hold the audio URL
  const [loading, setLoading] = useState(false); // State to track loading status

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state

    // Simulate form submission and TTS processing
    switch (selectedTab) {
      case "pdf":
        console.log("Submitting PDF:", pdfFile);
        break;
      case "link":
        console.log("Submitting Article Link:", articleLink);
        break;
      case "text":
        console.log("Submitting Text:", textInput);
        break;
    }

    // Simulate fetching the audio URL from backend
    const audio = await generateAudioUrl();
    setAudioUrl(audio); // Set the audio URL
    setLoading(false); // Turn off loading state
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Instant Podcast</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pdf">
                <FileIcon className="w-4 h-4 mr-2" />
                PDF
              </TabsTrigger>
              <TabsTrigger value="link">
                <LinkIcon className="w-4 h-4 mr-2" />
                Article Link
              </TabsTrigger>
              <TabsTrigger value="text">
                <TextIcon className="w-4 h-4 mr-2" />
                Text
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pdf" className="mt-4">
              <Label htmlFor="pdf-upload">Upload PDF</Label>
              <Input
                id="pdf-upload"
                type="file"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                className="mt-1"
              />
            </TabsContent>
            <TabsContent value="link" className="mt-4">
              <Label htmlFor="article-link">Article Link</Label>
              <Input
                id="article-link"
                type="url"
                placeholder="https://example.com/article"
                value={articleLink}
                onChange={(e) => setArticleLink(e.target.value)}
                className="mt-1"
              />
            </TabsContent>
            <TabsContent value="text" className="mt-4">
              <Label htmlFor="text-input">Text Input</Label>
              <Textarea
                id="text-input"
                placeholder="Enter your text here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="mt-1"
                rows={5}
              />
            </TabsContent>
          </Tabs>
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Processing..." : "Submit"}
          </Button>
        </form>

        {/* Conditionally render audio player once audio URL is available */}
        {audioUrl && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Your Audio Podcast</h3>
            <audio controls src={audioUrl} className="w-full mt-2">
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
