import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"

@Entity()
export class GameLog {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    clientId: string

    @Column()
    game: string // e.g., 'squidgame', 'flappybird', etc.

    @Column()
    teammateId: string

    @Column()
    enemyId: string

    @Column({ type: 'json', nullable: true })
    HighScore: any

    @CreateDateColumn()
    createdAt: Date
}