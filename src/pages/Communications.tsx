import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Plus, Send, Users, Mail, MessageSquare, Phone, Eye, Trash2 } from "lucide-react";
import { mockCommunications, type Communication } from "@/data/mockData";
import { useLocation } from "react-router-dom";

const Communications = () => {
  const location = useLocation();
  const isStudentView = location.pathname.includes('/student');
  const [communications, setCommunications] = useState<Communication[]>(mockCommunications);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Communication | null>(null);
  const [filter, setFilter] = useState("all");
  const [newMessage, setNewMessage] = useState<Partial<Communication>>({
    channels: [],
    priority: "medium",
    type: "announcement",
    audience: "all"
  });

  const handleCreateMessage = () => {
    if (newMessage.title && newMessage.message) {
      const message: Communication = {
        id: Date.now().toString(),
        title: newMessage.title,
        message: newMessage.message,
        type: newMessage.type as Communication['type'],
        channels: newMessage.channels as Communication['channels'],
        audience: newMessage.audience as Communication['audience'],
        priority: newMessage.priority as Communication['priority'],
        status: 'sent',
        createdAt: new Date().toISOString(),
        createdBy: 'Current User',
        readCount: 0,
        totalRecipients: 100,
        readBy: []
      };
      
      setCommunications([message, ...communications]);
      setNewMessage({
        channels: [],
        priority: "medium",
        type: "announcement", 
        audience: "all"
      });
      setIsCreating(false);
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully."
      });
    }
  };

  const handleDeleteMessage = (id: string) => {
    setCommunications(communications.filter(comm => comm.id !== id));
    toast({
      title: "Message Deleted",
      description: "The message has been deleted successfully."
    });
  };

  const filteredCommunications = communications.filter(comm => {
    if (isStudentView) {
      // Students see only published communications for all, students, or their class
      return comm.status === "sent" && (comm.audience === "all" || comm.audience === "students");
    }
    if (filter === "all") return true;
    return comm.type === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'sms': return <Phone className="h-4 w-4" />;
      case 'in-app': return <MessageSquare className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isStudentView ? "My Messages" : "Communications"}
          </h1>
          <p className="text-muted-foreground">
            {isStudentView ? "View announcements and messages" : "Manage announcements, alerts, and notifications"}
          </p>
        </div>
        {!isStudentView && (
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Message
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Communication</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-4 py-4">
                <Input
                  placeholder="Message Title"
                  value={newMessage.title || ''}
                  onChange={(e) => setNewMessage({...newMessage, title: e.target.value})}
                />
                
                <Textarea
                  placeholder="Message Content"
                  value={newMessage.message || ''}
                  onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                  rows={4}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Select value={newMessage.type} onValueChange={(value) => setNewMessage({...newMessage, type: value as Communication['type']})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Message Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="alert">Alert</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={newMessage.priority} onValueChange={(value) => setNewMessage({...newMessage, priority: value as Communication['priority']})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Select value={newMessage.audience} onValueChange={(value) => setNewMessage({...newMessage, audience: value as Communication['audience']})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="administrators">Administrators</SelectItem>
                  </SelectContent>
                </Select>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Delivery Channels</label>
                  <div className="flex flex-wrap gap-4">
                    {['email', 'sms', 'in-app'].map((channel) => (
                      <div key={channel} className="flex items-center space-x-2">
                        <Checkbox
                          id={channel}
                          checked={newMessage.channels?.includes(channel as any)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewMessage({
                                ...newMessage,
                                channels: [...(newMessage.channels || []), channel as any]
                              });
                            } else {
                              setNewMessage({
                                ...newMessage,
                                channels: newMessage.channels?.filter(c => c !== channel) || []
                              });
                            }
                          }}
                        />
                        <label htmlFor={channel} className="text-sm capitalize cursor-pointer">
                          {channel === 'in-app' ? 'In-App' : channel}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button onClick={handleCreateMessage} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Cards (Admin Only) */}
      {!isStudentView && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                  <p className="text-2xl font-bold text-foreground">{communications.length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sent Today</p>
                  <p className="text-2xl font-bold text-foreground">
                    {communications.filter(c => 
                      new Date(c.createdAt).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
                <Send className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

         <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Recipients</p>
                  <p className="text-2xl font-bold text-foreground">
                    {communications.reduce((sum, c) => sum + (c.totalRecipients || 0), 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Read Rate</p>
                  <p className="text-2xl font-bold text-foreground">
                    {communications.length > 0 
                      ? Math.round(communications.reduce((sum, c) => sum + ((c.readCount || 0) / (c.totalRecipients || 1)), 0) / communications.length * 100)
                      : 0}%
                  </p>
                </div>
                <Eye className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters (Admin Only) */}
      {!isStudentView && (
        <div className="flex gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Messages</SelectItem>
              <SelectItem value="announcement">Announcements</SelectItem>
              <SelectItem value="alert">Alerts</SelectItem>
              <SelectItem value="reminder">Reminders</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Messages List */}
      <div className="space-y-4">
        {filteredCommunications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No messages found</p>
            </CardContent>
          </Card>
        ) : (
          filteredCommunications.map((comm) => (
            <Card key={comm.id} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{comm.title}</h3>
                      <Badge className={getPriorityColor(comm.priority)}>
                        {comm.priority}
                      </Badge>
                      <Badge className={getStatusColor(comm.status)}>
                        {comm.status}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3 line-clamp-2">{comm.message}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Type: {comm.type}</span>
                      <span>Audience: {comm.audience}</span>
                      <div className="flex items-center gap-1">
                        <span>Channels:</span>
                        {comm.channels.map((channel, index) => (
                          <span key={index} className="flex items-center">
                            {getChannelIcon(channel)}
                          </span>
                        ))}
                      </div>
                      <span>{new Date(comm.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    {!isStudentView && comm.totalRecipients && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        Read: {comm.readCount || 0}/{comm.totalRecipients} ({Math.round(((comm.readCount || 0) / comm.totalRecipients) * 100)}%)
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedMessage(comm)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {!isStudentView && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteMessage(comm.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Message View Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.title}</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(selectedMessage.priority)}>
                  {selectedMessage.priority}
                </Badge>
                <Badge className={getStatusColor(selectedMessage.status)}>
                  {selectedMessage.status}
                </Badge>
              </div>
              
              <div className="p-4 bg-muted rounded-3xl">
                <p className="text-foreground">{selectedMessage.message}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium text-foreground">{selectedMessage.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Audience</p>
                  <p className="font-medium text-foreground">{selectedMessage.audience}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Created By</p>
                  <p className="font-medium text-foreground">{selectedMessage.createdBy}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Created At</p>
                  <p className="font-medium text-foreground">
                    {new Date(selectedMessage.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-muted-foreground text-sm mb-2">Delivery Channels</p>
                <div className="flex gap-2">
                  {selectedMessage.channels.map((channel, index) => (
                    <div key={index} className="flex items-center gap-1 px-2 py-1 bg-muted rounded">
                      {getChannelIcon(channel)}
                      <span className="text-sm capitalize">
                        {channel === 'in-app' ? 'In-App' : channel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Communications;