import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"

@Entity()
export class GameLog {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    clientId: string

    @Column()
    action: string // e.g., 'move', 'chat', etc.

    @Column({ type: 'json', nullable: true })
    payload: any

    @CreateDateColumn()
    createdAt: Date
}