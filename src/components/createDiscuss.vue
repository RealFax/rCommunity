<template>
    <v-dialog v-model="status" width="700" persistent>
        <v-card>
            <v-card-title>
                {{ replyStruct.replyUser ? '回复' : '为' }}
                <v-chip color="primary" outlined small class="ml-1 mr-1">
                    <v-icon left>alternate_email</v-icon>
                    {{ replyStruct.replyUser  ? replyStruct.name : replyStruct.name }}
                </v-chip>
                {{ replyStruct.replyUser  ? '' : '创建一个新的讨论'}}
            </v-card-title>
            <!--原始内容-->
            <v-card-subtitle v-if="replyStruct.replyUser" class="pt-3">
                <v-card flat color="grey lighten-4">
                    <v-card-text style="color: #515151" class="font-weight-medium pt-2 pl-2 pb-2 pr-2">
                        {{
                            replyStruct.raw.content.length > 100 ? replyStruct.raw.content.slice(0, 100) + `....` : replyStruct.raw.content
                        }}
                    </v-card-text>
                </v-card>
            </v-card-subtitle>

            <v-divider style="width: 90%; margin-left: 5%"></v-divider>
            <v-textarea
                :rules="rules"
                :value="reply.Content"
                v-model="reply.Content"
                counter
                class="v-card__text mt-5"
                label="写下一段友好的回复叭！o(*￣▽￣*)ブ"
            >
            </v-textarea>

            <v-card-actions>
                <v-btn @click="closeEdit" text>
                    <v-icon>close</v-icon>
                    我不想回复了:(
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn outlined class="mr-2" @click="sendReply">
                    <v-icon style="transform: rotate(-45deg);margin-left: 2px; margin-top: -5px;">send</v-icon>
                    发送
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: [
        'replyStruct',
        'status'
    ],
    name: "createDiscuss",
    data() {
        return {
            reply: {
                Content: ''
            },
            rules: [
                v => v.length <= 300 || '你不能发送更多的内容了哦/(ㄒoㄒ)/~~'
            ]
        }
    },
    watch: {
        privateStatus(val) {
            if (!val) {
                this.closeEdit();
            }
        }
    },
    methods: {
        clearContent() {
            this.reply.Content = '';
        },
        closeEdit() {
            this.clearContent();
            this.$emit('closeDiscussEdit')
        },
        sendReply() {
            let date = new Date();
            let reply = {
                isReply: this.replyStruct.replyUser,
                avatarId: '1849004341',
                nickname: 'Hum!!!',
                content: this.reply.Content,
                timestamp: Math.round(date.getTime() / 1000)
            };
            if (this.replyStruct.replyUser) {
                Object.assign(reply, {
                    rawDiscuss: this.replyStruct.raw
                });
            }
            this.$emit('append-discuss', reply);
        }
    }
}
</script>

<style scoped>

</style>
